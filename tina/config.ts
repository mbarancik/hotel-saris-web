import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "static",
  },
  media: {
    tina: {
      mediaRoot: "media",
      publicFolder: "static",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "pages",
        path: "content/pages",
        label: "Stránky",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Nadpis",
            isTitle: true,
            required: true,
          },
          {
            type: "image",
            name: "image",
            label: "Titulný obrázok",
          },
          {
            type: "object",
            name: "body",
            label: "Obsah",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item.title || "Untitled"
              })
            },
            fields: [
              {
                type: "string",
                name: "title",
                label: "Nadpis",
              },
              {
                type: "image",
                name: "gallery",
                label: "Obrázky",
                list: true,
              },
              {
                type: "rich-text",
                name: "text",
                label: "Text",
                isBody: true,
              },
              {
                type: "object",
                name: "buttons",
                label: "Tlačidlá",
                list: true,
                templates: [
                  {
                    name: "pageButton",
                    label: "Interný odkaz na stránku",
                    ui: {
                      itemProps: (item) => ({
                        label: item.text || "Untitled"
                      })
                    },
                    fields: [
                      {
                        type: "string",
                        name: "text",
                        label: "Text tlačidla",
                      },
                      {
                        type: "reference",
                        name: "page",
                        label: "Stránka",
                        collections: ["pages"],
                      },
                    ],
                  },
                  {
                    name: "urlButton",
                    label: "Externý odkaz na URL",
                    ui: {
                      itemProps: (item) => ({
                        label: item.text || "Untitled"
                      })
                    },
                    fields: [
                      {
                        type: "string",
                        name: "text",
                        label: "Text tlačidla",
                      },
                      {
                        type: "string",
                        name: "link",
                        label: "Odkaz",
                      },
                    ],
                  },
                ],
              },
            ],
          }
        ],
      },
    ],
  },
});
