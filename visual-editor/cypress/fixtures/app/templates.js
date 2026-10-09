// Copy of the block declarations of a production host (the Ciklik app),
// used by cypress/e2e/compat.cy.js to catch breaking changes for existing users.
/**
 * @param {string} name
 */
function jsonLoader(name) {
  return () => {
    return fetch(`/templates/${name}.json`).then((r) => r.json());
  };
}

/**
 * @param {import('@boxraiser/visual-editor').VisualEditor} editor
 */
export function registerTemplates(editor) {
  editor.registerTemplate({
    name: "Home Food",
    image: "/templates/home-food.png",
    description: "Page d'accueil pour un site tourné autour de l'alimentation",
    data: jsonLoader("home-food"),
  });
  editor.registerTemplate({
    name: "Page design",
    image: "/templates/design.png",
    description: "Page design idéal pour de l'ammeublement",
    data: jsonLoader("design"),
  });
  editor.registerTemplate({
    name: "Page café",
    image: "/templates/coffee.png",
    description: "Un modèle de page pour la vente de café / thé",
    data: jsonLoader("coffee"),
  });
  editor.registerTemplate({
    name: "Page sans marque",
    image: "/templates/sans-marque.png",
    description: "Une page pour les modèles comme la marque en moins",
    data: jsonLoader("sans-marque"),
  });
  editor.registerTemplate({
    name: "Makeup",
    image: "/templates/makeup.png",
    description: "Un modèle de page pour la vente de produits de beauté",
    data: jsonLoader("makeup"),
  });
  editor.registerTemplate({
    name: "Camp",
    image: "/templates/camp.png",
    description: "Un modèle de page pour la vente de produits de camping",
    data: jsonLoader("camp"),
  });
  editor.registerTemplate({
    name: "Book",
    image: "/templates/book.png",
    description: "Un modèle de page pour la vente de livres",
    data: jsonLoader("book"),
  });
  editor.registerTemplate({
    name: "Trekking",
    image: "/templates/treck.png",
    description: "Un modèle de page pour la vente de produits de trekking",
    data: jsonLoader("treck"),
  });
}
