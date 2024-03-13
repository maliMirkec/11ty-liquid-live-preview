const contentful = require("contentful")

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN_DELIVERY,
  environment: process.env.CONTENTFUL_ENVIRONMENT
})

module.exports = async function() {
  return client.getEntries({
    content_type: 'cta',
    order: 'sys.createdAt'
  })
  .then((response) => {
    const ret = response.items.map(item => {
      return {
        ...item.fields,
        id: item.sys.id
      }
    })

    return ret
  })
  .catch(console.error)
}
