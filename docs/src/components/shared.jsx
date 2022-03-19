import {
  Color,
  HTMLText,
  ImageUrl,
  Repeater,
  Row,
  Select,
  Tabs,
  Text,
  TextAlign,
  Range,
  VisualEditor,
} from "../../../visual-editor/dist/VisualEditor.js";

const Colors = [
  "--bs-blue",
  "--bs-indigo",
  "--bs-purple",
  "--bs-pink",
  "--bs-red",
  "--bs-orange",
  "--bs-yellow",
  "--bs-green",
  "--bs-teal",
  "--bs-cyan",
  "--bs-white",
  "--bs-gray",
  "--bs-gray-dark",
  "--bs-primary",
  "--bs-secondary",
  "--bs-success",
  "--bs-info",
  "--bs-warning",
  "--bs-danger",
  "--bs-light",
  "--bs-dark",
];

const ImageField = (name = "image", label = "image") =>
  ImageUrl(name, {
    label: label,
    onBrowse: (url) => Promise.resolve("https://picsum.photos/425/458"),
  });

const ButtonField = () =>
  Row([
    Text("label", { label: "Libellé", default: "Call to action" }),
    Text("url", { label: "Lien" }),
    Select("type", {
      default: "primary",
      label: "type",
      options: [
        { label: "Primaire", value: "primary" },
        { label: "Secondaire", value: "secondary" },
      ],
    }),
  ]);

const ColorField = (name, label) =>
  Color(name, { label: label, colors: Colors });

const TitleField = (name = "title", label = "Titre") =>
  Row(
    [
      HTMLText(name, {
        default: "Lorem ipsum dolor sit amet",
        label: label,
        multiline: false,
        colors: Colors,
      }),
      TextAlign(name + "Align", {
        label: "Alignement",
      }),
    ],
    { columns: "1fr max-content" }
  );

const ContentField = (name = "content", label = "Description") =>
  HTMLText(name, {
    label: label,
    default:
      "<p>Minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet.</p>",
    multiline: true,
    colors: Colors,
    variables: {
      background: "backgroundColor",
      color: "textColor",
    },
  });

const ButtonsField = () =>
  Repeater("buttons", {
    title: "Boutons",
    addLabel: "Add a button",
    fields: [ButtonField()],
  });

const Style = () => [
  Row(
    [
      ColorField("backgroundColor", "Background"),
      ColorField("textColor", "Text"),
      ImageField("background", "Background"),
      ImageField("backgroundMobile", "Background (mobile)"),
    ],
    { columns: "50px 50px 1fr 1fr" }
  ),

  Row([
    Select("backgroundSize", {
      default: "cover",
      label: "Size",
      options: [
        { label: "Remplir", value: "cover" },
        { label: "Contenir", value: "contain" },
        { label: "Original", value: "auto" },
      ],
    }),
    Select("backgroundRepeat", {
      default: "no-repeat",
      label: "Repeat",
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
  Range("padding", { label: "Vertical Padding", default: 3 }),
];

const WithStyles = (contentFields, styleFields = []) => {
  return [
    Tabs(
      {
        label: "Contenu",
        fields: contentFields,
      },
      {
        label: "Apparence",
        fields: [...styleFields, ...Style()],
      }
    ),
  ];
};

let editor = new VisualEditor();

editor.registerComponent("hero", {
  title: "Hero",
  fields: WithStyles([TitleField(), ContentField(), ButtonsField()]),
});

editor.registerComponent("pricing", {
  title: "Pricing",
  category: "Commerce",
  fields: WithStyles([
    TitleField(),
    ContentField(),
    Repeater("prices", {
      min: 1,
      max: 5,
      collapsed: "title",
      fields: [
        HTMLText("title", {
          label: "Title",
          default: "Pro",
          multiline: false,
        }),
        Text("price", { label: "Price", default: "15€" }),
        Text("features", { label: "Features", multiline: true }),
        ButtonField(),
      ],
    }),
  ]),
});

editor.registerComponent("icons-columns", {
  title: "Icons columns",
  fields: WithStyles([
    Repeater("icons", {
      min: 1,
      max: 5,
      collapsed: "title",
      fields: [
        Text("title", { label: "Title", default: "Featured title" }),
        ContentField(),
      ],
    }),
  ]),
});

editor.registerComponent("text", {
  title: "Formatted text",
  fields: [ContentField()],
});

editor.registerTemplate({
  name: "Homepage",
  description: "A simple page to show the template feature",
  image: "/visual-editor/img/template1.png",
  data: [
    {
      title: "Album example",
      titleAlign: "center",
      content:
        "<p>Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don't simply skip over it entirely.</p>",
      buttons: [
        {
          label: "Main call to action",
          url: "#",
          type: "primary",
        },
        {
          label: "Secondary action",
          url: "#",
          type: "secondary",
        },
      ],
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundXPosition: "center",
      backgroundYPosition: "center",
      padding: 5,
      _name: "hero",
      backgroundColor: null,
      textColor: "--bs-primary",
      background: "",
      backgroundMobile: "",
    },
    {
      icons: [
        {
          title: "First title",
          content:
            "<p>Minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet.</p><p><br></p>",
        },
        {
          title: "Second title",
          content:
            "<p>Minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet.</p>",
        },
        {
          title: "Third title",
          content:
            "<p>Minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet.</p>",
        },
      ],
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundXPosition: "center",
      backgroundYPosition: "center",
      padding: 5,
      _name: "icons-columns",
      backgroundColor: "",
      textColor: "",
      background: "",
      backgroundMobile: "",
    },
    {
      title: "Pricing",
      titleAlign: "center",
      content:
        "<p>Quickly build an effective pricing table for your potential customers with this Bootstrap example. It’s built with default Bootstrap components and utilities with little customization.</p>",
      prices: [
        {
          title: "Free",
          price: "0€",
          features:
            "10 users included\n2 GB of storage\nEmail support\nHelp center access",
          label: "Sign up for free",
          url: "#",
          type: "secondary",
        },
        {
          title: "Pro",
          price: "15€",
          features:
            "20 users included\n10 GB of storage\nPriority email support\nHelp center access",
          label: "Get started",
          url: "#",
          type: "primary",
        },
        {
          title: "Enterprise",
          price: "29€",
          features:
            "30 users included\n15 GB of storage\nPhone and email support\nHelp center access",
          label: "Contact us",
          url: "#",
          type: "primary",
        },
      ],
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundXPosition: "center",
      backgroundYPosition: "center",
      padding: 5,
      _name: "pricing",
      backgroundColor: "",
      textColor: "",
      background: "",
      backgroundMobile: "",
    },
    {
      title: "Lorem ipsum dolor sit amet",
      titleAlign: "right",
      content:
        "<p>Minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet.</p>",
      buttons: [
        {
          label: "Call to action",
          url: "",
          type: "primary",
        },
        {
          label: "Call to action",
          url: "",
          type: "secondary",
        },
      ],
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundXPosition: "center",
      backgroundYPosition: "center",
      padding: 3,
      _name: "hero",
      backgroundColor: null,
      textColor: "",
      background: "",
      backgroundMobile: "",
    },
  ],
});

editor.defineElement();
