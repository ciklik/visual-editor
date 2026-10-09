// Compatibility with a production host: server/compat.html loads the real
// block declarations of the Ciklik app (cypress/fixtures/app) and mimics its
// Vue field. These tests protect the contract existing users rely on.

const libraryExports = [
  'Alignment',
  'Checkbox',
  'Color',
  'DatePicker',
  'FR',
  'HTMLText',
  'ImageUrl',
  'Number',
  'Range',
  'Repeater',
  'Row',
  'Select',
  'Tabs',
  'Text',
  'TextAlign',
  'VisualEditor',
]

const visit = (initialValue) => {
  cy.intercept('POST', '/preview*', (req) => {
    const body = req.body
    const blocs = Array.isArray(body) ? body : [body]
    const html = blocs.map((b) => `<section>${b._name}</section>`).join('')
    req.reply(
      Array.isArray(body)
        ? `<html><body><main id="ve-components">${html}</main></body></html>`
        : html
    )
    req.alias = Array.isArray(body) ? 'previewPage' : 'previewBloc'
  })
  cy.intercept('GET', '/templates/*.json', (req) => {
    const name = req.url.split('/').pop()
    req.reply({ fixture: `app/templates/${name}` })
  })
  cy.visit('/server/compat.html', {
    onBeforeLoad(win) {
      win.initialValue = initialValue
    },
  })
  cy.window().its('host.ready').should('be.true')
}

const openEditor = () => cy.get('#toggle').click()

const addBloc = (title) => {
  cy.contains('button', 'Ajouter un bloc').click()
  cy.contains(title).click()
}

const lastChange = () =>
  cy.window().then((win) => {
    const changes = win.host.changes
    expect(changes.length, 'change events').to.be.greaterThan(0)
    const detail = changes[changes.length - 1]
    expect(detail, 'event.detail').to.be.a('string')
    return JSON.parse(detail)
  })

const changeCount = () => cy.window().then((win) => win.host.changes.length)

// Every action must emit a change event whose detail is the full JSON
const expectNewChange = (count, assertion) => {
  cy.window().should((win) => {
    const changes = win.host.changes
    expect(changes.length, 'change events').to.be.greaterThan(count)
    const detail = changes[changes.length - 1]
    expect(detail, 'event.detail').to.be.a('string')
    // The last event carries the current value of the element
    expect(detail).to.equal(win.document.querySelector('visual-editor').value)
    const data = JSON.parse(detail)
    assertStoredFormat(data)
    if (assertion) {
      assertion(data)
    }
  })
}

const findIds = (value, path = '$') => {
  if (Array.isArray(value)) {
    return value.flatMap((v, k) => findIds(v, `${path}[${k}]`))
  }
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([k, v]) =>
      k === '_id' ? [`${path}.${k}`] : findIds(v, `${path}.${k}`)
    )
  }
  return []
}

// Format stored by the host: array of blocs, `_name`, no `_id` at any depth
const assertStoredFormat = (data) => {
  expect(data).to.be.an('array')
  data.forEach((bloc) => expect(bloc).to.have.property('_name'))
  expect(findIds(data), '_id in the JSON').to.deep.equal([])
}

const previewFrame = () =>
  cy
    .get('iframe')
    .its('0.contentDocument.body')
    .should('not.be.empty')
    .then(cy.wrap)

describe('Compatibility with a production host', () => {
  it('exposes the named exports used by the host', () => {
    visit()
    cy.window().then((win) => {
      libraryExports.forEach((name) =>
        expect(win.host.exports, name).to.include(name)
      )
    })
  })

  it('reads the value set before insertion without emitting change', () => {
    cy.fixture('app/templates/book.json').then((book) => {
      visit(JSON.stringify(book))
      cy.get('visual-editor').then((el) => {
        const value = JSON.parse(el[0].value)
        assertStoredFormat(value)
        expect(value.map((b) => b._name)).to.deep.equal(
          book.map((b) => b._name)
        )
      })
      openEditor()
      cy.contains('Colonnes')
      cy.window().its('host.changes').should('have.length', 0)
    })
  })

  it('emits change with the JSON as detail on every action', () => {
    visit()
    openEditor()

    // Add
    changeCount().then((count) => {
      addBloc('Newsletter')
      expectNewChange(count, (data) => {
        expect(data.map((b) => b._name)).to.deep.equal(['newsletter'])
        // Row and Tabs fields are stored flat on the bloc
        expect(data[0]).to.have.property('backgroundColor')
        expect(data[0]).to.have.property('paddingY')
      })
    })

    // Edit a single line HTMLText: no <p>
    changeCount().then((count) => {
      cy.contains('label', 'Titre').siblings().first().click()
      cy.get('body').type('{selectall}Hello world')
      expectNewChange(count, (data) =>
        expect(data[0].title).to.equal('Hello world')
      )
    })

    // Add a second bloc, then move it with the preview arrows
    changeCount().then((count) => {
      addBloc('Titre avec boutons à droite')
      expectNewChange(count, (data) =>
        expect(data.map((b) => b._name)).to.have.length(2)
      )
    })
    cy.wait('@previewBloc')
    lastChange().then((before) => {
      const names = before.map((b) => b._name)
      changeCount().then((count) => {
        previewFrame()
          .contains('section', names[1])
          .parent()
          .parent()
          .find('button')
          .then((buttons) => {
            // up, down and delete are the last three buttons
            cy.wrap(buttons[buttons.length - 3]).click({ force: true })
          })
        expectNewChange(count, (data) =>
          expect(data.map((b) => b._name)).to.deep.equal([names[1], names[0]])
        )
      })
      changeCount().then((count) => {
        previewFrame()
          .contains('section', names[1])
          .parent()
          .parent()
          .find('button')
          .then((buttons) => {
            // up, down and delete are the last three buttons
            cy.wrap(buttons[buttons.length - 2]).click({ force: true })
          })
        expectNewChange(count, (data) =>
          expect(data.map((b) => b._name)).to.deep.equal(names)
        )
      })
    })

    // Remove then rollback
    changeCount().then((count) => {
      cy.get('[aria-label="Supprimer le bloc"]').first().click()
      expectNewChange(count, (data) => expect(data).to.have.length(1))
    })
    changeCount().then((count) => {
      cy.contains('Rétablir').click()
      expectNewChange(count, (data) => expect(data).to.have.length(2))
    })
  })

  it('keeps the content when the editor is closed and opened again', () => {
    visit()
    openEditor()
    addBloc('Newsletter')
    cy.contains('label', 'Titre').siblings().first().click()
    cy.get('body').type('{selectall}Kept')
    cy.get('[aria-label="Fermer"]').click()
    openEditor()
    cy.get('visual-editor').should((el) => {
      expect(JSON.parse(el[0].value)[0].title).to.equal('Kept')
    })
    cy.contains('Newsletter')
  })

  it('stores dates in seconds and colors as raw --colorN', () => {
    visit()
    openEditor()
    addBloc('Compte à rebours')
    changeCount().then((count) => {
      cy.contains('label', 'Date').scrollIntoView().siblings().first().click()
      cy.contains('div', '17').click()
      expectNewChange(count, (data) => {
        expect(data[0].date).to.be.a('number')
        // Seconds, not milliseconds
        expect(data[0].date).to.be.lessThan(1e11)
      })
    })
    cy.contains('button', 'Apparence').click()
    changeCount().then((count) => {
      cy.contains('label', 'Fond du compteur')
        .parent()
        .find('button')
        .first()
        .click()
      cy.get('[data-radix-popper-content-wrapper] [style*="var(--color3)"]')
        .first()
        .click()
      expectNewChange(count, (data) =>
        expect(data[0].countdownBackground).to.equal('--color3')
      )
    })
  })

  it('loads a template and emits change', () => {
    visit()
    openEditor()
    cy.contains('Utiliser un modèle').click()
    changeCount().then((count) => {
      cy.contains('Book').click()
      cy.fixture('app/templates/book.json').then((book) =>
        expectNewChange(count, (data) =>
          expect(data.map((b) => b._name)).to.deep.equal(
            book.map((b) => b._name)
          )
        )
      )
    })
  })

  it('posts the whole page to the preview, then each bloc', () => {
    cy.fixture('app/templates/camp.json').then((camp) => {
      visit(JSON.stringify(camp))
      openEditor()
      cy.wait('@previewPage').its('request.body').should('be.an', 'array')
      addBloc('Newsletter')
      cy.wait('@previewBloc')
        .its('request.body')
        .should((body) => {
          expect(body).not.to.be.an('array')
          expect(body).to.have.property('preview', true)
          expect(body).to.have.property('_name')
        })
    })
  })

  it('ignores a rejected onBrowse (file manager closed)', () => {
    visit()
    openEditor()
    addBloc('Compte à rebours')
    lastChange().then((before) => {
      cy.contains('label', 'Image').parent().find('button').first().click()
      cy.window().its('host.browseRejected').should('be.true')
      lastChange().then((after) => expect(after).to.deep.equal(before))
    })
  })

  it('submits the host form with the save button and no extra field', () => {
    visit()
    openEditor()
    addBloc('Compte à rebours')
    // Text alignment radios must not be submitted with the form (#4)
    cy.get('input[type="radio"]').should('exist')
    cy.get('input[type="radio"][name]').should('not.exist')
    cy.contains('button', 'Sauvegarder').should('have.attr', 'type', 'submit')
    cy.contains('button', 'Sauvegarder').click()
    cy.window().its('host.submitted').should('deep.equal', [])
  })
})
