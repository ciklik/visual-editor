// Copy of the block declarations of a production host (the Ciklik app),
// used by cypress/e2e/compat.cy.js to catch breaking changes for existing users.
import {
  ImageUrl,
  Row,
  Text,
  Select,
  Color,
  HTMLText,
  Repeater,
  Range,
  Tabs,
  TextAlign,
} from "@boxraiser/visual-editor";

export const Colors = new Array(11).fill(1).map((v, k) => `--color${k + 1}`);

export const ImageField = (name = "image", label = "Image", options = {}) =>
  ImageUrl(name, {
    ...options,
    label: label,
    onBrowse: (url) => {
      ImageField.filemanagerController.open();
      return new Promise((resolve, reject) => {
        ImageField.filemanagerController.resolve = resolve;
        ImageField.filemanagerController.reject = reject;
      });
    },
  });

ImageField.filemanagerController = {
  open: () => null,
  resolve: () => null,
  reject: () => null,
};

export const ButtonField = (name = "label", label = "Libellé", prefix = "") =>
  Row([
    Text(prefix + name, { label: label }),
    Text(`${prefix}url`, { label: "Lien" }),
    Select(`${prefix}type`, {
      default: "primary",
      label: "type",
      options: [
        { label: "Primaire", value: "primary" },
        { label: "Secondaire", value: "secondary" },
        { label: 'Couleur personnalisée', value: 'custom'}
      ],
    }),
    SiteColor(`${prefix}color`, 'Couleur').when(`${prefix}type`, "custom")
  ]);

export const SiteColor = (name, label) =>
  Color(name, { label: label, colors: Colors });

export const Title = (name = "title", label = "Titre", defaultValue = null) =>
  HTMLText(name, {
    default: defaultValue ?? "Lorem ipsum dolor sit amet",
    label: label,
    multiline: false,
    colors: Colors,
  });

export const AlignedTitle = (
  defaultAlign = "center",
  name = "title",
  label = "Titre"
) =>
  Row(
    [
      Title(name, label),
      TextAlign(name + "Align", {
        default: defaultAlign,
        label: label,
      }),
    ],
    { columns: "1fr max-content" }
  );

export const Content = (name = "content", label = "Description", args = {}) =>
  HTMLText(name, {
    label: label,
    default:
      "<p>Minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet.</p>",
    multiline: true,
    colors: Colors,
    backgroundColor: "backgroundColor",
    textColor: "textColor",
    ...args,
  });

export const Buttons = (label) =>
  Repeater("buttons", {
    label,
    title: "Boutons",
    addLabel: "Ajouter un bouton",
    collapsed: "label",
    fields: [ButtonField("label")],
  });

export const Style = () => [
  Select("visibility", {
    default: "all",
    label: "Visibilité",
    options: [
      { label: "Tous les types d'écrans", value: "all" },
      { label: "Mobile seulement", value: "mobile" },
      { label: "Bureau seulement", value: "desktop" },
    ],
  }),
  Row(
    [
      SiteColor("backgroundColor", "Fond"),
      SiteColor("textColor", "Texte"),
      SiteColor('decoration', 'Decoration'),
      ImageField("background", "Fond"),
      ImageField("backgroundMobile", "Fond (mobile)"),
    ],
    { columns: "50px 50px 50px 1fr 1fr" }
  ),
  Range("paddingY", {
    label: "Padding vertical",
    default: 5,
    min: 0,
    max: 15,
  }),
  Row([
    Select("backgroundSize", {
      default: "cover",
      label: "Taille",
      options: [
        { label: "Remplir", value: "cover" },
        { label: "Contenir", value: "contain" },
        { label: "Original", value: "auto" },
      ],
    }),
    Select("backgroundRepeat", {
      default: "no-repeat",
      label: "Répétition",
      options: [
        { label: "Aucune", value: "no-repeat" },
        { label: "x", value: "repeat-x" },
        { label: "y", value: "repeat-y" },
        { label: "x & y", value: "repeat" },
      ],
    }),
    Select("backgroundXPosition", {
      default: "center",
      label: "Position (X)",
      options: [
        { label: "Centrer", value: "center" },
        { label: "Gauche", value: "left" },
        { label: "Droite", value: "right" },
      ],
    }),
    Select("backgroundYPosition", {
      default: "center",
      label: "Position (Y)",
      options: [
        { label: "Centrer", value: "center" },
        { label: "Haut", value: "top" },
        { label: "Bas", value: "bottom" },
      ],
    }),
  ]).when("background", (b) => b),
];

export const IconsWithLabel = () =>
  Repeater("icons", {
    title: "Icônes",
    addLabel: "Ajouter une icône",
    collapsed: "label",
    fields: [
      ImageField(),
      HTMLText("label", {
        label: "Description",
        multiline: false,
        colors: Colors,
      }),
      Text("url", {
        label: "URL",
        help: "Laissez vide pour ne pas mettre de liens",
      }),
    ],
  });

export const IconsPosition = () =>
  Select("iconsPosition", {
    label: "Position de l'icône",
    default: "left",
    options: [
      { label: "Gauche", value: "left" },
      { label: "Au-dessus", value: "top" },
      { label: "En dessous", value: "bottom" },
      { label: "Liste", value: "list" },
    ],
  });

export const WithStyles = (
  contentFields,
  styleFields = [],
  allowVisiblity = true
) => {
  return [
    Tabs(
      {
        label: "Contenu",
        fields: contentFields,
      },
      {
        label: "Apparence",
        fields: [
          ...styleFields,
          ...Style().filter((f) =>
            allowVisiblity ? f : f.name !== "visibility"
          ),
        ],
      }
    ),
  ];
};
