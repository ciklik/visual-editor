const addComponentText = 'Add a component'
const allFieldText = 'All field'

const assertValue = (fn) => {
  cy.get('visual-editor').should((v) => {
    const expectation = fn(JSON.parse(v.val()))
    return typeof expectation === 'boolean'
      ? expect(expectation).to.be.true
      : expectation
  })
}

const assertValueMatch = (key, value) => {
  return assertValue((v) => expect(v[0][key]).to.equals(value))
}

const addBlock = () => {
  cy.get('@addComponent').click()
  cy.contains(allFieldText).click()
}

describe('Editor behaviour', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000/server/test.php')
    cy.contains(addComponentText).as('addComponent')
  })

  it('Should display the editor', () => {
    cy.get('@addComponent')
  })

  it('Should let me add a block', () => {
    addBlock()
    assertValue((v) => v.length === 1 && v[0]._name === 'demo')
  })

  it('Should let me fill a field', () => {
    addBlock()
    cy.contains('Text').click()
    cy.get('body').type('Hello world')
    assertValueMatch('text', 'Hello world')
  })

  it('Should not now the checkbox by default', () => {
    addBlock()
    cy.contains('Checkbox 1').should('not.exist')
    cy.contains('Checkbox').click()
    cy.contains('Checkbox 1').should('exist')
    assertValueMatch('checkbox', true)
  })

  it('Should use tabs', () => {
    addBlock()
    cy.contains('label', 'Settings').should('not.exist')
    cy.contains('button', 'Settings').click()
    cy.contains('label', 'Settings').click()
    cy.get('body').type('Hello world')
    assertValueMatch('settings', 'Hello world')
  })

  describe('HTML Editor', function () {
    it('inline content should not contain HTML', () => {
      addBlock()
      cy.contains('label', 'HTML One line').siblings().first().click()
      cy.get('body').type('Hello world')
      assertValueMatch('oneline', 'Hello world')
    })

    it('should insert strong with toolbar', () => {
      addBlock()
      cy.contains('label', 'HTML One line').siblings().first().click()
      cy.get('body').type('Hello world{selectall}')
      cy.get('[title="Bold"]').click()
      assertValueMatch('oneline', '<strong>Hello world</strong>')
    })

    it('should insert multiple paragraphs with toolbar', () => {
      addBlock()
      cy.contains('label', 'HTML Multiline').siblings().first().click()
      cy.get('body').type('Hello{enter}World')
      assertValueMatch('multiline', '<p>Hello</p><p>World</p>')
    })

    it('should insert multiple paragraphs with toolbar', () => {
      addBlock()
      cy.contains('label', 'HTML Multiline').siblings().first().click()
      cy.get('body').type('Hello World{selectall}')
      cy.get('[title="Center"]').click()
      assertValueMatch(
        'multiline',
        '<p style="text-align: center">Hello World</p>'
      )
      cy.get('button[title="Left"]').click()
      assertValueMatch('multiline', '<p>Hello World</p>')
    })

    it('should apply the right alignment depending of the default alignment', () => {
      addBlock()
      cy.contains('label', 'Text Align')
        .siblings()
        .find('input[title="Right"]')
        .click()
      cy.contains('label', 'HTML Multiline').siblings().first().click()
      cy.get('body').type('Hello World{selectall}')
      cy.get('.WysiwygToolbar button[title="Left"]').click()
      assertValueMatch(
        'multiline',
        '<p style="text-align: left">Hello World</p>'
      )
    })
  })
})
