import {
  ImageUrl,
  Row,
  Text,
  Select,
  Color,
  HTMLText,
  Repeater,
  Range,
} from './VisualEditor'

export const Colors = ['--pink', '--purple', '--blue', '--green', '--white'];

export const ImageField = (name: string= 'image', label: string = 'image') =>
  new ImageUrl(name, {
    label: label,
    onBrowse: (url) => Promise.resolve('https://picsum.photos/425/458'),
  })

export const ButtonField = () =>
  new Row([
    new Text("label", { label: "Libellé" }),
    new Text("url", { label: "Lien" }),
    new Select("type", {
      default: "primary",
      label: "type",
      options: [
        { label: "Primaire", value: "primary" },
        { label: "Secondaire", value: "secondary" },
      ],
    }),
  ]);

export const SiteColor = (name, label) =>
  new Color(name, { label: label, colors: Colors });

export const Title = (name = "title", label = "Titre") =>
  new HTMLText(name, {
    default: "Lorem ipsum dolor sit amet",
    label: label,
    multiline: false,
    colors: Colors,
  });

export const Content = (name = "content", label = "Description") =>
  new HTMLText(name, {
    label: label,
    default:
      "<p>Minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet.</p>",
    multiline: true,
    colors: Colors,
  }).background('backgroundColor').color('textColor');

export const Buttons = () =>
  new Repeater("buttons", {
    title: "Boutons",
    addLabel: "Ajouter un bouton",
    fields: [ButtonField()],
  });

export const Style = () => [
    new Row(
      [
        SiteColor("backgroundColor", "Fond"),
        SiteColor("textColor", "Texte"),
        ImageField("background", "Fond"),
        ImageField("backgroundMobile", "Fond (mobile)"),
      ],
      { columns: "50px 50px 1fr 1fr" }
    ),
    new Range('padding', {label: 'Padding vertical'})
  ]

export const IconsWithLabel = () =>
  new Repeater("icons", {
    title: "Icônes",
    addLabel: "Ajouter une icône",
    fields: [ImageField(), new Text("label", { label: "Description" })],
  });
