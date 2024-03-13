const contentful = require("contentful")

module.exports = async function(preview) {
  const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: preview ? process.env.CONTENTFUL_ACCESS_TOKEN_PREVIEW : process.env.CONTENTFUL_ACCESS_TOKEN_DELIVERY,
    environment: process.env.CONTENTFUL_ENVIRONMENT,
    host: preview ? 'preview.contentful.com' : 'cdn.contentful.com'
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
