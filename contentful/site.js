const contentful = require("contentful")

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN_DELIVERY,
  environment: process.env.CONTENTFUL_ENVIRONMENT
})

module.exports = async function() {
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
