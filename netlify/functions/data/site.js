const contentful = require("contentful")

export default async () => {
  const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN_PREVIEW,
    environment: process.env.CONTENTFUL_ENVIRONMENT,
    host: 'preview.contentful.com'
  })

  return client.getEntries({
    content_type: 'settings',
    order: 'sys.createdAt',
    limit: 1000
  })
  .then((response) => {
    return response.items[0].fields
  })
  .catch(console.error)
}
