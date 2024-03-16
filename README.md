# Eleventy Liquid Live Preview

This is a starter project for the simple [Eleventy](https://www.11ty.dev/) site that pulls the data from [Contentful](https://www.contentful.com/), but also allows the live preview on Contentful.

See the demo site: [11ty-llp.netlify.app/](11ty-llp.netlify.app/).

## The project

Clone the project.

Install dependencies.

### Contentful

Create a new [Contentful project](https://www.contentful.com/get-started/).

Use the following content type structure:

**Settings**

| Name | Field Type |
|---|---|
| Name (**Entry title**) | Short text |
| Description | Long text |
| OG Image | Media |
| Collaborators | Short text, list |
| URL | Short text |
| Source | Short text |
| Twitter | Short text |

**Page**

| Name | Field Type |
|---|---|
| Title (**Entry title**) | Short text |
| Slug | Short text |
| Description | Long text |
| Og Image | Media |
| Components | References, many |

**Components**

| Name | Field Type |
|---|---|
| Name (**Entry title**) | Short text |
| Title | Short text |
| Subtitle | Short text |
| Text | Long text |
| CTA | References, many |
| Cards | References, many |
| Media | Media, many files |
| Note | Long text |
| Type | Short text |

**CTA**

| Name | Field Type |
|---|---|
| Name (**Entry title**) | Short text |
| Text | Short text |
| Href | Short text |

**The Visual Modeler**

![Contentful content model Visual Modeler](https://raw.githubusercontent.com/maliMirkec/11ty-liquid-live-preview/99454480084fbbc15e2b668c1cafb561053cd002/assets/gfx/contentful-content-model.png)

## Environment variables

Add the `.env` file to the root of the project.

Use the data from the Contentful.

```
CONTENTFUL_SPACE_ID=xyz
CONTENTFUL_ACCESS_TOKEN_DELIVERY=xyz
CONTENTFUL_ACCESS_TOKEN_PREVIEW=xyz
CONTENTFUL_ENVIRONMENT=master
```

### Run or build

Run the project.

```
npm run dev
```

Open [localhost:8080](http://localhost:8080).

Preview Contentful page by page's id [localhost:8080/preview/?id=xyz](http://localhost:8080/preview/?id=xyz)

### Resources

Coming soon.

<!-- Read how I built the Contentful Liquid Live Preview project. -->
