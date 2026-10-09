// Copy of the block declarations of a production host (the Ciklik app),
// used by cypress/e2e/compat.cy.js to catch breaking changes for existing users.
// Only change: ".js" added to the local import, for the browser.
import {
  Alignment,
  Checkbox,
  DatePicker,
  HTMLText,
  Number as NumberField,
  Range,
  Repeater,
  Row,
  Select,
  Text,
  TextAlign,
  Tabs,
  VisualEditor,
} from "@boxraiser/visual-editor";
import {
  AlignedTitle,
  ButtonField,
  Buttons,
  Colors,
  Content,
  IconsPosition,
  IconsWithLabel,
  ImageField,
  SiteColor,
  Title,
  WithStyles,
} from "./shared.js";

/**
 * @param {VisualEditor} editor
 */
export function registerBlocs(editor) {
  editor.registerComponent("html", {
    title: "HTML",
    category: "Spécial",
    fields: [Text("html", { label: "HTML", multiline: true })],
  });

  editor.registerComponent("markdown", {
    title: "Markdown",
    category: "Spécial",
    fields: [Text("content", { label: "Markdown", multiline: true })],
  });

  editor.registerComponent("formatted-text", {
    title: "Texte formaté",
    category: "Spécial",
    fields: WithStyles([
      HTMLText("content", {
        allowHeadings: true,
        default:
          "<p>Minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet.</p>",
        multiline: true,
        colors: Colors,
        defaultAlign: "contentAlign",
      }),
      // L'alignement se règle ici plutôt que dans la bulle de la barre d'outils :
      // ses boutons d'alignement et de titre se masquent d'eux-mêmes (can() faux).
      TextAlign("contentAlign", { label: "Alignement du texte" }),
    ]),
  });

  editor.registerComponent("boxed-content", {
    title: "Texte encadré",
    category: "Spécial",
    fields: WithStyles(
      [
        Repeater("rows", {
          title: "Ligne",
          addLabel: "Ajouter une ligne",
          min: 1,
          fields: [ImageField("image", "Icône"), Content()],
        }),
        Content(),
      ],
      [
        Row([
          SiteColor("boxBorder", "Bordure"),
          SiteColor("boxBackground", "Fond de l'encadré"),
          SiteColor("boxColor", "Texte de l'encadré"),
        ]),
      ]
    ),
  });

  editor.registerComponent("columns-with-title", {
    title: "Colonnes",
    category: "Colonnes",
    fields: WithStyles(
      [
        Title(),
        Repeater("columns", {
          title: "Colonnes",
          addLabel: "Ajouter une colonne",
          fields: [
            ImageField("image", "Image"),
            Content("body", "Contenu"),
            Select("imagePosition", {
              label: "Position de l'image",
              default: "center",
              options: [
                { label: "Gauche", value: "left" },
                { label: "Centre", value: "center" },
                { label: "Droite", value: "right" },
              ],
            }),
            Buttons(),
          ],
        }),
        Buttons(),
      ],
      [
        Range("mobileColumns", {
          label: "Colonnes sur mobile",
          max: 2,
          min: 1,
          default: 1,
        }),
        Checkbox("withCard", {
          label: 'Style "carte"',
        }),
      ]
    ),
  });

  editor.registerComponent("hero-big", {
    title: "Bannière",
    category: "Spécial",
    fields: [
      Repeater("slides", {
        label: "Slides",
        collapsed: "title",
        min: 1,
        addLabel: "Ajouter un slide",
        fields: WithStyles(
          [
            AlignedTitle(),
            Range("titleSize", {
              min: 1,
              max: 5,
              default: 2,
              label: "Niveau de titre",
            }),
            Content("content", "Description", { defaultAlign: "titleAlign" }),
            Text("video", { label: "Vidéo" }),
            Buttons("Boutons"),
          ],
          [
            Checkbox("flexButtons", {
              label: "Aligner les boutons sur une ligne",
            }),
            Range("titleFontSize", {
              label: "Taille des titres",
              min: 1,
              max: 4,
              step: 0.1,
            }),
            Range("textFontSize", {
              label: "Taille des text",
              min: 1,
              max: 4,
              step: 0.1,
            }),
            Range("desktopHeight", {
              label: "Hauteur (en % de l'écran)",
              min: 20,
              max: 100,
              step: 5,
            }),
            Range("marginButton", {
              label: "Espace au dessus des boutons",
              default: 0,
              min: 0,
              max: 15,
            }),
            Select("mobileLayout", {
              label: "Affichage mobile",
              default: "overlay",
              options: [
                { label: "Image sous le texte", value: "overlay" },
                { label: "Image au dessus du texte", value: "image-top" },
              ],
            }),
            Select("textPosition", {
              label: "Position du text",
              default: "center",
              options: [
                { label: "Gauche", value: "left" },
                { label: "Centre", value: "center" },
                { label: "Droite", value: "right" },
              ],
            }),
          ],
          false
        ),
      }),
      NumberField("duration", {
        label: "Durée de défilement (en seconde)",
        default: 6,
      }),
    ],
  });

  editor.registerComponent("icons-columns", {
    title: "Section avec icônes",
    category: "Colonnes",
    fields: WithStyles(
      [
        AlignedTitle('center'),
        Content(),
        Repeater("columns", {
          label: "Colonnes",
          collapsed: "title",
          min: 1,
          addLabel: "Ajouter une colonne",
          fields: [ImageField("icon", "Icône"), Title(), Content()],
        }),
        Buttons(),
      ],
      [
        Select("layout", {
          label: "Affichage",
          default: "column",
          options: [
            { label: "Colonnes", value: "column" },
            { label: "Grille", value: "grid" },
            { label: "Lignes", value: "row" },
          ],
        }),
        Range("mobileColumns", {
          label: "Nombre de colonnes sur mobile",
          min: 1,
          max: 3,
          default: 1,
        }).when("layout", "column"),
      ]
    ),
  });

  editor.registerComponent("title-icons-columns", {
    title: "Section avec titre & icônes",
    category: "Colonnes",
    fields: WithStyles(
      [
        Title(),
        Repeater("columns", {
          label: "Colonnes",
          collapsed: "title",
          min: 1,
          addLabel: "Ajouter une colonne",
          fields: [ImageField("icon", "Icône"), Title(), Content()],
        }),
      ],
      [
        Select("mobileLayout", {
          label: "Affichage mobile",
          default: "column",
          options: [
            { label: "Colonne", value: "column" },
            { label: "Ligne", value: "row" },
          ],
        }),
      ]
    ),
  });

  editor.registerComponent("newsletter", {
    title: "Newsletter",
    category: "Spécial",
    fields: WithStyles([Title(), Content()]),
  });

  editor.registerComponent("testimonials", {
    title: "Témoignages",
    category: "Spécial",
    fields: WithStyles([
      AlignedTitle(),
      Repeater("columns", {
        label: "Colonnes",
        collapsed: "title",
        min: 1,
        addLabel: "Ajouter un témoignage",
        fields: [ImageField("image", "Image"), Title(), Content()],
      }),
    ]),
  });

  editor.registerComponent("steps", {
    title: "Etapes",
    category: "Spécial",
    fields: WithStyles(
      [
        ImageField(),
        AlignedTitle("left"),
        Text("caption", { label: "Mention sous l'image" }),
        Repeater("steps", {
          title: "Étapes",
          addLabel: "Ajouter une étape",
          min: 2,
          max: 6,
          fields: [Title("step", null), ImageField("image", "Icône")],
        }),
      ],
      [
        Row(
          [
            SiteColor("stepColor", "Puces"),
            Alignment("align", {
              label: "Position de l'image",
              default: "right",
            }),
          ],
          { columns: "50px 1fr" }
        ),
      ]
    ),
  });

  editor.registerComponent("bloc-centered", {
    title: "Bloc centré",
    category: "Spécial",
    fields: WithStyles(
      [Title(), Content(), IconsWithLabel(), Buttons()],
      [IconsPosition()]
    ),
  });

  editor.registerComponent("images-hoverable", {
    title: "Images survolables",
    category: "Images",
    fields: WithStyles([
      Title(),
      Repeater("images", {
        title: "Images",
        addLabel: "Ajouter une image",
        min: 1,
        max: 3,
        fields: [ImageField(), Content()],
      }),
    ]),
  });

  editor.registerComponent("user-ratings", {
    title: "Evaluations",
    category: "Colonnes",
    fields: WithStyles([
      Title(),
      Repeater("columns", {
        label: "Colonnes",
        collapsed: "title",
        min: 1,
        addLabel: "Ajouter une colonne",
        fields: [
          ImageField("icon", "Icône"),
          Title(),
          Content(),
          NumberField("note", { label: "Note / 5" }),
        ],
      }),
      Content(),
    ]),
  });

  editor.registerComponent("google-reviews", {
    title: "Avis google",
    category: "Spécial",
    fields: WithStyles([
      Title(),
      Text("placeId", { label: "ID de l'établissement sur Google" }),
      Content(),
    ]),
  });

  editor.registerComponent("news", {
    title: "News",
    category: "Colonnes",
    fields: WithStyles(
      [
        Repeater("news", {
          label: "News",
          collapsed: "title",
          min: 1,
          addLabel: "Ajouter une news",
          fields: [
            ImageField(),
            Title(),
            Text("category", { label: "Catégorie" }),
            HTMLText("content", { label: "Description", multiline: true }),
            Text("url", { label: "URL" }),
          ],
        }),
        Buttons(),
      ],
      [
        SiteColor("categoryColor", "Couleur de la catégorie"),
        Checkbox("card", {
          label: "Utiliser une apparence de carte",
        }),
      ]
    ),
  });

  editor.registerComponent("cta-hover", {
    title: "Call to action hover",
    category: "Spécial",
    fields: WithStyles([
      Title(),
      Content(),
      Select("textPosition", {
        label: "Position du texte",
        default: "center",
        options: [
          { label: "Gauche", value: "left" },
          { label: "Centre", value: "center" },
          { label: "Droite", value: "right" },
        ],
      }),
      Buttons(),
    ]),
  });

  editor.registerComponent("alternate-icons", {
    title: "Contenu alterné droite / gauche",
    category: "Colonnes",
    fields: WithStyles([
      Title(),
      Repeater("items", {
        label: "Blocs",
        collapsed: "title",
        min: 1,
        addLabel: "Ajouter un bloc",
        fields: [ImageField("icon", "Icône"), Title(), Content()],
      }),
    ]),
  });

  editor.registerComponent("text-image", {
    title: "Texte avec image",
    category: "Spécial",
    fields: WithStyles(
      [
        ImageField(),
        Text("video", { label: "Vidéo" }),
        AlignedTitle(),
        Content(),
        IconsWithLabel(),
        Buttons(),
      ],
      [
        Alignment("align", {
          label: "Position de l'image",
          vertical: true,
          default: "left",
        }),
        Checkbox("imageEdge", { label: "Image au bord de l'écran" }).when(
          "align",
          (v) => ["left", "right"].includes(v)
        ),
        Range("imageSize", {
          label: "Proportion de l'image",
          min: 10,
          max: 90,
          default: 50,
        }).when("align", (v) => ["left", "right"].includes(v)),
        Range("containerWidth", {
          label: "Taille maximale du bloc text",
          min: 0,
          max: 1000,
          default: 1000,
        }).when("align", (v) => ["top", "bottom"].includes(v)),
        Checkbox("checkicon", {
          label: "Utiliser des check pour les listes",
        }),
        SiteColor("iconColor", "Couleur des checkbox").when("checkicon", true),
        IconsPosition(),
        Range("iconsColumnMobile", {
          label: "Nombre de colonne sur mobile",
          min: 1,
          max: 2,
          default: 2,
        }),
      ]
    ),
  });

  editor.registerComponent("countdown", {
    title: "Compte à rebours",
    category: "Spécial",
    fields: WithStyles(
      [
        ImageField(),
        AlignedTitle(),
        Content(),
        DatePicker("date", {
          label: "Date",
          default: Date.now() / 1000,
          time: true,
        }),
        Buttons(),
      ],
      [
        Range("imageSize", {
          label: "Proportion de l'image",
          min: 10,
          max: 90,
          default: 50,
        }),
        Alignment("align", {
          label: "Position de l'image",
          vertical: true,
          default: "left",
        }),
        Row([
          SiteColor("countdownBackground", "Fond du compteur"),
          SiteColor("countdownColor", "Couleur du compteur"),
        ]),
      ]
    ),
  });

  editor.registerComponent("title-buttons", {
    title: "Titre avec boutons à droite",
    category: "Spécial",
    fields: WithStyles([Title(), Buttons()]),
  });

  editor.registerComponent("trustpilot", {
    title: "Avis trustpilot",
    category: "Spécial",
    fields: WithStyles([
      AlignedTitle(),
      Content(),
      Text("businessId", { label: "ID Business" }),
    ]),
  });
  editor.registerComponent("images-carousel", {
    title: "Carrousel d'images",
    category: "Images",
    fields: WithStyles(
      [
        Title(),
        Content(),
        Repeater("images", {
          label: "Blocs",
          collapsed: "title",
          min: 1,
          addLabel: "Ajouter une image",
          fields: [ImageField(), Title(), Content()],
        }),
        Buttons(),
      ],
      [
        Range("titleSize", {
          min: 1,
          max: 5,
          default: 2,
          label: "Niveau de titre",
        }),
        NumberField("slidesVisible", {
          label: "Nombre d'éléments visible",
          default: 5,
        }),
        NumberField("slidesToScroll", {
          label: "Nombre d'élément à faire défiler",
          default: 1,
          help: `Pour que la boucle fonctionne assurez vous que le nombre d'image soit un multiple de ce chiffre`,
        }),
      ]
    ),
  });

  editor.registerComponent("products-carousel", {
    title: "Carrousel produits",
    category: "Images",
    fields: WithStyles([
      Title(),
      Content(),
      Repeater("items", {
        label: "Produits",
        collapsed: "name",
        min: 1,
        addLabel: "Ajouter un produit",
        fields: [
          ImageField(),
          Text("name", { label: "Titre" }),
          Text("url", { label: "URL produit" }),
        ],
      }),
    ]),
  });

  editor.registerComponent("gallery", {
    title: "Galerie d'image",
    category: "Images",
    fields: WithStyles(
      [
        Title(),
        Content(),
        Checkbox("titleLeft", { label: "Titre à gauche" }),
        Text("facebook", { label: "Facebook" }),
        Text("instagram", { label: "Instagram" }),
        Text("pinterest", { label: "Pinterest" }),
        Text("youtube", { label: "Youtube" }),
        Text("twitter", { label: "Twitter" }),
        Text("tiktok", { label: "Tiktok" }),
        Repeater("images", {
          label: "Blocs",
          collapsed: "title",
          min: 1,
          addLabel: "Ajouter une image",
          fields: [ImageField()],
        }),
      ],
      [
        Checkbox("highlight", {
          label: "Mettre en avant la première image",
        }),
      ]
    ),
  });

  editor.registerComponent("products", {
    title: "Produits",
    category: "Colonnes",
    fields: WithStyles([
      Title(),
      Content(),
      Buttons(),
      Repeater("products", {
        label: "Produit",
        collapsed: "title",
        min: 1,
        addLabel: "Ajouter un produit",
        fields: [
          ImageField(),
          Title(),
          Text("price", { label: "Prix", default: "X€ / mois" }),
          Text("oldPrice", { label: "Prix barré" }),
          Text("priceInfos", {
            label: "Information sur le prix",
            default: "Livraison inclue",
          }),
          Text("arguments", {
            label: "Arguments",
            multiline: true,
            default: "Livraison inclue",
          }),
          Checkbox("checkmarks", {
            label: "Utiliser des icônes pour les arguments",
            default: true,
          }),
          Text("highlight", {
            default: "Meilleur vente !",
            label: "Libellé de mise en avant",
          }),
          ButtonField(),
          Text("infos", {
            label: "Informations",
            default: "Reconduit tous les mois",
          }),
          Checkbox("hasFooter", { label: "Afficher un footer" }),
          ImageField("footerIcon", "Icône").when("hasFooter"),
          Text("footerContent", {
            multiline: false,
            label: "Mention dans le footer",
            default: "7 jours pour essayer ou se faire rembourser",
          }).when("hasFooter"),
          Checkbox("hasPopup", {
            label: "Afficher une popup d'information",
          }).when("hasFooter"),
          Text("popupTitle", {
            label: "Titre de la popup",
            default: "100% sans risque",
            multiline: false,
          }).when("hasPopup"),
          Text("popupContent", {
            multiline: true,
            label: "Contenu de la popup",
          }).when("hasPopup"),
        ],
      }),
    ]),
  });

  editor.registerComponent("checklists", {
    title: "Checklist",
    category: "Spécial",
    fields: WithStyles(
      [
        AlignedTitle(),
        Repeater("checklists", {
          label: "Liste",
          collapsed: "title",
          min: 1,
          addLabel: "Ajouter une liste",
          fields: [
            Title(),
            ImageField(),
            Repeater("items", {
              label: "Elements",
              collapsed: "title",
              addLabel: "Ajouter un élément",
              fields: [Text("title", { label: "Titre" })],
            }),
            Repeater("disabledItems", {
              label: "Elements désactivés",
              collapsed: "title",
              addLabel: "Ajouter un élément désactivé",
              fields: [Text("title", { label: "Titre" })],
            }),
            Checkbox("highlighted", { label: "Produit mis en avant" }),
            Text("highlightedText", {
              label: "Libellé de la mise en avant",
            }).when("highlighted"),
            Buttons(),
            Text("content", { label: "description" }),
          ],
        }),
        Content(),
      ],
      [
        Checkbox("inversedMobile", {
          label: "Inversé sur mobile",
        }),
        Row([
          SiteColor("titleBackground", "Couleur de fond du titre"),
          SiteColor("titleColor", "Couleur de fond du titre"),
        ]),
      ]
    ),
  });

  editor.registerComponent("stats", {
    title: "Statistiques",
    category: "Colonnes",
    fields: WithStyles([
      AlignedTitle(),
      Repeater("items", {
        label: "Elements désactivés",
        collapsed: "title",
        min: 1,
        addLabel: "Ajouter un élément",
        fields: [
          Title().when("hasImage", false),
          ImageField().when("hasImage", true),
          Checkbox("hasImage", {
            label: "Utiliser une image",
            default: false,
          }),
          Content(),
        ],
      }),
      Buttons(),
    ]),
  });

  editor.registerComponent("carousel-text-image", {
    title: "Carousel de texte avec image",
    category: "Carousel",
    fields: [
      Repeater("items", {
        label: "Slides",
        collapsed: "title",
        min: 1,
        addLabel: "Ajouter un slide",
        fields: WithStyles(
          [
            ImageField(),
            Text("video", { label: "Vidéo" }),
            Title(),
            Content(),
            IconsWithLabel(),
            Checkbox("checkicon", {
              label: "Utiliser des check pour les listes",
            }),
            Buttons(),
          ],
          [
            Row([
              Alignment("align", {
                label: "Position de l'image",
                default: "left",
              }),
              SiteColor("iconColor", "Couleur des checkbox").when(
                "checkicon",
                true
              ),
              IconsPosition(),
            ]),
          ]
        ),
      }),
    ],
  });

  editor.registerComponent("faq", {
    title: "FAQ / Caractéristiques",
    category: "Spécial",
    fields: WithStyles(
      [
        AlignedTitle("left"),
        Repeater("items", {
          label: "Elements désactivés",
          collapsed: "title",
          min: 1,
          addLabel: "Ajouter un élément",
          fields: [
            Text("title", { label: "Titre" }),
            HTMLText("content", {
              label: "Contenu",
              default:
                "<p>Minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet.</p>",
              multiline: true,
              colors: Colors,
              allowHeadings: true,
            }),
            Text("html", { label: "Contenu HTML", multiline: true }),
          ],
        }),
      ],
      [
        Checkbox("tabs", { label: "Affichage avec des onglets" }),
        Select("itemTitleAlign", {
          label: "Alignement du titre",
          default: "left",
          options: [
            { label: "Gauche", value: "left" },
            { label: "Centre", value: "center" },
            { label: "Droite", value: "right" },
          ],
        }).when("tabs", false),
      ]
    ),
  });

  editor.registerComponent("faq-illustrated", {
    title: "Caractéristiques détaillées",
    category: "Spécial",
    fields: WithStyles([
      AlignedTitle("left"),
      Repeater("items", {
        label: "Elements",
        collapsed: "title",
        min: 1,
        addLabel: "Ajouter un élément",
        fields: [ImageField(), Title(), Content(), Content("detail", "Détail")],
      }),
    ]),
  });

  editor.registerComponent("img-overflow", {
    title: "Image à cheval",
    category: "Images",
    fields: [
      ImageField(),
      Row([
        Range("x", {
          label: "Décalage horizontal",
          default: 0,
          min: -100,
          max: 100,
        }),
        Range("y", {
          label: "Décalage vertical",
          default: 0,
          min: -100,
          max: 100,
        }),
      ]),
    ],
  });

  editor.registerComponent("highlighted-plan", {
    title: "Formule mise en avant",
    category: "Marchand",
    fields: WithStyles([
      AlignedTitle(),
      Title("planTitle", "Titre de la formule"),
      ImageField(),
      Text("badge", { label: "Badge", default: "Le plus choisi" }),
      Text("price", { label: "Prix" }),
      Text("priceInfo", { label: "Information sur le prix" }),
      Text("duration", { label: "Durée du programme" }),
      ButtonField("button", "Bouton"),
      Text("contentBadge", {
        label: "Badge au dessus du contenu",
        default: "Satisfait ou remboursé",
        multiline: true,
      }),
      HTMLText("content", {
        label: "Contenu",
        default:
          "<p>Minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet.</p>",
        multiline: true,
        colors: Colors,
        allowHeadings: true,
      }),
      Content("advantage", "Liste des avantages"),
    ]),
  });

  editor.registerComponent("program-comparison", {
    title: "Comparatif de programme",
    category: "Marchand",
    fields: WithStyles([
      AlignedTitle("center"),
      Row(
        [
          Text("promoName", {
            label: "Titre réduction",
            default: "Offre flash",
          }),
          Text("promoPrice", { label: "Prix réduit" }),
          Text("promoOriginal", { label: "Prix original" }),
        ],
        {
          columns: "1fr 100px 100px",
        }
      ),
      Repeater("items", {
        label: "Formules",
        collapsed: "title",
        fields: [
          ImageField("image", "Image"),
          Row([Title("title", "Titre"), SiteColor("color", "Couleur")], {
            columns: "1fr 50px",
          }),
          Content("body", "Description"),
          Repeater("features", {
            label: "Caractéristiques",
            collapsed: "body",
            fields: [
              ImageField("icon", "Icône"),
              Text("body", { label: "Explication" }),
            ],
          }),
          Repeater("targets", {
            label: "Idéal pour",
            collapsed: "body",
            fields: [Text("body", { label: "Texte" })],
          }),
          NumberField("price", { label: "Prix" }),
          Text("cta", { label: "Libellé du bouton" }),
          Text("url", { label: "URL" }),
        ],
      }),
      Repeater("rows", {
        label: "Tableau",
        collapsed: "title",
        fields: [
          Row(
            [
              Text("title", { label: "Titre" }),
              Checkbox("in1", { label: "" }),
              Checkbox("in2", { label: "" }),
            ],
            { columns: "1fr 50px 50px" }
          ),
        ],
      }),
    ]),
  });

  editor.registerComponent("day-meals", {
    title: "Journée type",
    category: "Marchand",
    fields: WithStyles([
      AlignedTitle("center"),
      ImageField("image", "image"),
      Text("subtitle", { label: "Titre de la carte" }),
      Content("body", "Description"),
      Repeater("items", {
        label: "Elements",
        collapsed: "title",
        fields: [
          ImageField("image", "image"),
          Content("body", "Description"),
          Row(
            [
              Text("title", { label: "Titre" }),
              SiteColor("background", "Fond"),
            ],
            { columns: "1fr 50px 50px" }
          ),
        ],
      }),
    ]),
  });

  editor.registerComponent("highlighted-plan-cards", {
    title: "Formule en avant avec cartes",
    category: "Spécial",
    fields: WithStyles([
      AlignedTitle(),
      Tabs(
        {
          label: "Gauche",
          fields: [
            Title("programTitle", "Titre de la formule"),
            Text("programSubtitle", {
              label: "Sous titre de la formule",
              multiline: false,
            }),
            Text("programDescription", {
              label: "Description courte de la formule",
              multiline: true,
            }),
            Repeater("programFeatures", {
              min: 1,
              label: "Avantage de la formule",
              collapsed: "content",
              fields: [
                Text("content", { label: "Description", multiline: false }),
              ],
            }),
          ],
        },
        {
          label: "Droite",
          fields: [
            Text("programDuration", {
              label: "Durée de la formule",
              default: "Un mois",
              multiline: true,
            }),
            Text("programWeightLoss", {
              multiline: false,
              label: "Benéfice",
              default: "Super Avantage",
            }),
            NumberField("programPrice", {
              label: "Prix",
            }),
            NumberField("programOldPrice", {
              label: "Prix avant réduction",
            }),
            NumberField("programPromo", {
              label: "Pourcentage de réduction",
            }),
            Text("programPromoText", {
              label: "Texte lié à la promotion",
              default: "Réduction 1er mois",
            }),
            ButtonField(),
            ImageField("icon", "Icône"),
            Text("programFooter", {
              multiline: false,
              label: "Mention dans le footer",
              default: "Livraison gratuite",
            }),
          ],
        },
        {
          label: "Popup",
          fields: [
            Text("popupTitle", {
              label: "Titre",
              default: "100% sans risque",
              multiline: false,
            }),
            Text("popupContent", {
              multiline: true,
              label: "Contenu",
            }),
          ],
        }
      ),
    ]),
  });

  editor.registerComponent("table-plans", {
    title: "Tableau comparatif",
    category: "Marchand",
    fields: WithStyles([AlignedTitle()]),
  });

  editor.registerComponent("graph-weight", {
    title: "Graphique de perte de poid",
    category: "Marchand",
    fields: WithStyles([
      AlignedTitle(),
      NumberField("weight", {
        label: "Poid actuel",
        help: "Cette donnée sera ignorée lors d'un paramètre weight dans l'URL",
      }),
      NumberField("weightGoal", {
        label: "Poid cible",
        help: "Cette donnée sera ignorée lors d'un paramètre objective dans l'URL",
      }),
      Content(),
    ]),
  });

  editor.registerComponent("leadcatcher", {
    title: "Leadcatcher",
    category: "Marchand",
    fields: WithStyles([
      Title(),
      TextAlign("align", { label: "Position de la boite" }),
    ]),
  });

  editor.registerComponent("plan-selector-steps", {
    title: "Sélecteur de formule multi-étape",
    category: "Marchand",
    fields: [],
  });

  editor.registerComponent("plan-selector-2-steps", {
    title: "Sélecteur de formule 2 étapes",
    category: "Marchand",
    fields: [
      Repeater("items", {
        label: "Formules",
        collapsed: "title",
        fields: [
          ImageField("image"),
          Title('title'),
          Text("body", {
            label: "Description",
            default: "Programme de X mois",
          }),
          Repeater("features", {
            collapsed: "body",
            label: "Arguments",
            fields: [
              ImageField("icon"),
              Text("body", { label: "Argument", multiline: false }),
            ],
          }),
          Repeater("targets", {
            collapsed: "body",
            label: "Cibles",
            fields: [Text("body", { label: "Argument", multiline: false })],
          }),
          NumberField("price", { label: "Prix" }),
          SiteColor("color"),
          Repeater("items", {
            collapsed: "title",
            label: "Durées",
            fields: [
              Title('title', 'Titre', 'Pour perdre <strong>+ de 25kg</strong>'),
              ImageField(),
              Text("color", { label: "Code couleur", default: '#41CAD5', help: 'Valeur hexadecimal #41CAD5' }),
              Text("description", {
                label: "Description",
                default: "Programme de X mois",
              }),
              Title("basePrice", "Prix", '299€/mois'),
              Title("price", "Prix avec réduction", '<strong>99€</strong> le 1er mois puis <strong>299€</strong>/mois'),
              Row([
                Text('label', { label: 'Libellé du bouton' }),
                Text(`url`, { label: "Lien" }),
              ]),
              Text("aside", {
                label: "Informations annexes",
                default: "Economisez <strong>66%</strong> sur votre programme",
              }),
              Text("special", {
                label: "Mention spécial",
                help: "ex: Le plus populaire",
              }),
            ],
          }),
        ],
      }),
    ],
  });

  editor.registerComponent("plan-selector-2-steps-stairs", {
    title: "Sélecteur de formule 2 étapes en escalier",
    category: "Marchand",
    fields: [
      Repeater("items", {
        label: "Formules",
        collapsed: "title",
        fields: [
          ImageField("image"),
          Title('title'),
          Text("body", {
            label: "Description",
            default: "Programme de X mois",
          }),
          Repeater("features", {
            collapsed: "body",
            label: "Arguments",
            fields: [
              ImageField("icon"),
              Text("body", { label: "Argument", multiline: false }),
            ],
          }),
          Repeater("targets", {
            collapsed: "body",
            label: "Cibles",
            fields: [Text("body", { label: "Argument", multiline: false })],
          }),
          NumberField("price", { label: "Prix" }),
          SiteColor("color"),
          Repeater("items", {
            collapsed: "title",
            label: "Durées",
            fields: [
              Title('title', 'Titre', 'Pour perdre <strong>+ de 25kg</strong>'),
              NumberField('duration', {label: 'Durée', help: 'En mois'}),
              Text("color", { label: "Code couleur", default: '#0AB554', Chelp: 'Valeur hexadecimal #41CAD5' }),
              NumberField("basePrice", {label: "Prix original", help: 'Prix barré / mois'}),
              NumberField("promotion", {label: "Réduction", help: 'en %'}),
              NumberField("firstPrice", {label: "Prix le 1er mois"}),
              NumberField("mealPrice", {label: "Prix d'un repas"}),
              Text(`url`, { label: "Lien" }),
              Checkbox('highlighted', {label: 'Mettre en avant'})
            ],
          }),
        ],
      }),
    ],
  });


  editor.registerComponent("program-selector", {
    title: "Selecteur de programme",
    category: "Colonnes",
    fields: WithStyles(
      [
        Title(),
        Repeater("items", {
          label: "Formules",
          collapsed: "title",
          fields: [
            Title("title", "Nom de la formule"),
            NumberField("price", { label: "Prix" }),
            Text("subtitle", { label: "Sous titre", multiline: false }),
            Text("short", { label: "Description courte", multiline: true }),
            Text("argumentsTitle", {
              label: "Titre des arguments",
              multiline: false,
            }),
            Repeater("arguments", {
              label: "Arguments",
              collapsed: "content",
              fields: [
                Text("content", { label: "Argument", multiline: false }),
              ],
            }),
            Text("contentTitle", {
              label: "Titre du contenu",
              multiline: false,
            }),
            Repeater("content", {
              label: "Contenu du programme",
              fields: [
                ImageField("icon", "Icône"),
                Text("content", { label: "Contenu", multiline: true }),
              ],
            }),
            ButtonField(),
          ],
        }),
      ],
      [
        Row([
          SiteColor("highlightBackground", "Fond de mise en avant"),
          SiteColor("itemBackground", "Fond de la formule"),
        ]),
        Row([
          SiteColor("argumentsBackground", "Fond des arguments"),
          SiteColor("contentBackground", "Fond du contenu"),
        ]),
        Checkbox("isRadio", {
          label: "Utiliser comme un radio",
          help: "Les formules se comporteront comme un bouton radio, affichant / masquant les listes de prouits",
          default: false,
        }),
      ]
    ),
  });

  editor.registerComponent("sticky-bar", {
    title: "Sticky bar",
    category: "Spécial",
    fields: WithStyles([
      Text("title", "Titre"),
      Buttons(),
      HTMLText("description", {
        label: "Description additionnelle",
        multiline: false,
      }),
      Checkbox("showOnScroll", {
        label: "Afficher uniquement au scroll",
        help: "La barre sera masquée puis apparaîtra lorsque le visiteur scrolle au-delà de la première section",
        default: false,
      }),
    ]),
  });

  editor.registerComponent("blockquote", {
    title: "Citation",
    category: "Spécial",
    fields: WithStyles([
      Title(),
      HTMLText("quote", {
        default: "Lorem ipsum dolor sit amet",
        multiline: true,
        label: "Citation",
      }),
      HTMLText("content", {
        label: "Contenu sous la citation",
        multiline: true,
      }),
      Select("layout", {
        label: "Apparence",
        default: "center",
        options: [
          { label: "Citation", value: "quotes" },
          { label: "Lignes", value: "lines" },
          { label: "Encadré", value: "squared" },
          { label: "Guillemet", value: "quote" },
        ],
      }),
    ]),
  });

  editor.registerComponent("table", {
    title: "Table",
    category: "Spécial",
    fields: WithStyles(
      [
        Title(),
        Repeater("rows", {
          addLabel: "Ajouter une ligne",
          fields: [
            Repeater("cols", {
              addLabel: "Ajouter une colonne",
              collapsed: "content",
              fields: [HTMLText("content", { label: "", multiline: true })],
            }),
          ],
        }),
      ],
      [
        Checkbox("header", {
          label: "Utiliser une en tête",
          default: true,
        }),
        Checkbox("striped", {
          label: "Lignes rayées",
          default: true,
        }),
      ]
    ),
  });

  editor.registerComponent("arguments-columns", {
    title: "Arguments commerciaux",
    category: "Spécial",
    fields: WithStyles(
      [
        AlignedTitle("center", "title", "Titre"),
        Repeater("columns", {
          label: "Arguments",
          collapsed: "title",
          fields: [
            ImageField("image", "Image"),
            Text("title", { label: "Titre", multiline: false }),
            Text("content", {
              multiline: true,
              label: "Arguments commerciaux",
              help: "Laissez une ligne vide entre chaque argument",
            }),
          ],
        }),
        Content("mention", "Mention"),
      ],
      [SiteColor("boxBg", "Couleur Fond de la boîte")]
    ),
  });

  editor.registerComponent("step-images", {
    title: "Étapes avec images",
    category: "Spécial",
    fields: WithStyles(
      [
        Content("title", "Titre"),
        Repeater("items", {
          label: "Étapes",
          collapsed: "title",
          fields: [
            Text("title", { label: "Titre", multiline: false }),
            Content("content", "Contenu"),
            ImageField(),
          ],
        }),
      ],
      [SiteColor("stepBg", "Couleur Fond des étapes")]
    ),
  });

  editor.registerComponent("highlighted-video", {
    title: "Vu à la tv",
    category: "Spécial",
    fields: WithStyles([
      Content("title", "Titre"),
      Text("video", { label: "URL de la Video" }),
      ImageField("image", "Image", {
        help: "La miniature youtube sera utilisé pour une vidéo YouTube",
      }),
      Row(
        [
          Text("badge", { label: "Texte du badge round" }),
          SiteColor("badgeColor", "Couleur"),
        ],

        { columns: "1fr 50px" }
      ),
      Title("title", "Titre"),
      Content("content", "Description"),
      Repeater("figures", {
        label: "Informations clefs",
        collapsed: "title",
        fields: [
          ImageField("image", "Image"),
          Text("title", { label: "Titre", multiline: false }),
        ],
      }),
    ]),
  });

  editor.registerComponent("mobile-club", {
    title: "Rejoindre le club",
    category: "Marchand",
    fields: WithStyles([
      AlignedTitle(),
      Content(),
      Repeater("items", {
        label: "Points clefs",
        collapsed: "title",
        fields: [Text("title", { label: "Titre", multiline: false })],
      }),
      ButtonField(),
      ImageField(),
    ]),
  });

  editor.registerComponent("program-detail", {
    title: "Détail du programme",
    category: "Marchand",
    fields: WithStyles([
      Title("title", "Titre"),
      Tabs(
        {
          label: "Contenu",
          fields: [
            Repeater("items", {
              label: "Points clefs",
              collapsed: "title",
              fields: [
                Row([Text("number", { label: "Nombre" }), ImageField()], {
                  columns: "100px 1fr",
                }),
                Text("title", { label: "Titre", multiline: false }),
                Content(),
              ],
            }),
          ],
        },
        {
          label: "Bloc",
          fields: [Title("bloc_title", "Titre"), Content("bloc_content")],
        }
      ),
    ]),
  });

  editor.registerComponent("bloc-overflow", {
    title: "Bloc à cheval",
    category: "Marchand",
    fields: [
      ImageField(),
      Title(),
      Content(),
      Row(
        [SiteColor("backgroundColor", "Fond"), SiteColor("textColor", "Texte")],
        { columns: "50px 50px 50px 1fr 1fr" }
      ),
    ],
  });

  editor.registerComponent("duration-picker", {
    title: "Sélecteur de durée de programme",
    category: "Marchand",
    fields: WithStyles([
      Title(),
      Repeater("items", {
        collapsed: "title",
        fields: [
          Title(),
          ImageField(),
          Text("color", { label: "Code couleur" }),
          Text("description", {
            label: "Description",
            default: "Programme de X mois",
          }),
          Title("basePrice", "Prix"),
          Title("price", "Prix avec réduction"),
          ButtonField(),
          Text("aside", {
            label: "Informations annexes",
            default: "Economisez <strong>66%</strong> sur votre programme",
          }),
          Text("special", {
            label: "Mention spécial",
            help: "ex: Le plus populaire",
          }),
        ],
      }),
      Text("footer", { label: "Mentions" }),
    ]),
  });

  editor.registerComponent("duration-picker-stairs", {
    title: "Sélecteur de durée en escalier",
    category: "Marchand",
    fields: WithStyles([
      Title(),
      Repeater("items", {
        collapsed: "title",
        label: "Durées",
        fields: [
          Title('title', 'Titre', 'Pour perdre <strong>+ de 25kg</strong>'),
          NumberField('duration', {label: 'Durée', help: 'En mois'}),
          Text("color", { label: "Code couleur", default: '#0AB554', Chelp: 'Valeur hexadecimal #41CAD5' }),
          NumberField("basePrice", {label: "Prix original", help: 'Prix barré / mois'}),
          NumberField("promotion", {label: "Réduction", help: 'en %'}),
          NumberField("firstPrice", {label: "Prix le 1er mois"}),
          NumberField("mealPrice", {label: "Prix d'un repas"}),
          Text(`url`, { label: "Lien" }),
          Checkbox('highlighted', {label: 'Mettre en avant'}),
          ImageField('highlighted_badge', 'Badge de mise en avant').when("highlighted")
        ],
      }),
    ]),
  });

  editor.registerComponent("merchant-vision", {
    title: "Spécificité marchand",
    category: "Marchand",
    fields: WithStyles(
      [
        Title(),
        ImageField(),
        Content(),
        Title("cardTitle", "Titre de la carte"),
        Text("cardMention", { label: "Mention", default: "Notre solution" }),
        Content("cardContent", "Contenu de la carte"),
        Repeater("items", {
          collapsed: "title",
          fields: [Title(), ImageField()],
        }),
      ],
      [SiteColor("boxBackground", "Fond de l'encadré")]
    ),
  });

  editor.registerComponent("hero-merchant", {
    title: "Bannière marchand",
    category: "Marchand",
    fields: WithStyles([
      Title(),
      Content(),
      Buttons(),
      ImageField("logo", `Logo "produit de l'année"`),
      Repeater("items", {
        collapsed: "label",
        label: "Arguments commerciaux",
        addLabel: "Ajouter un argument",
        fields: [
          Text("label", { label: "Libellé" }),
          ImageField(),
          Alignment("align", {
            label: "Position de l'image",
            vertical: false,
            default: "right",
          }),
          Row([
            Checkbox("mobile", {
              label: "Mobile",
              default: true,
            }),
            Checkbox("desktop", {
              label: "Ecran",
              default: true,
            }),
          ]),
        ],
      }),
    ]),
  });

  editor.registerComponent("html-center", {
    title: "HTML Centré",
    category: "HTML",
    fields: WithStyles([
      Title(),
      Text("html", { label: "HTML", multiline: true }),
      ImageField("image", "Image", {
        help: "optionnel, créera 2 colonnes si une image est présente",
      }),
      Buttons(),
    ]),
  });

  editor.registerComponent("html-text", {
    title: "HTML avec texte",
    category: "HTML",
    fields: WithStyles([
      Text("html", { label: "HTML", multiline: true }),
      Title(),
      Content(),
      Buttons(),
    ]),
  });
}
