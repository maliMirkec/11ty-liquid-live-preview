const contentful = require("contentful")

module.exports = async function(preview) {
  const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: preview ? process.env.CONTENTFUL_ACCESS_TOKEN_PREVIEW : process.env.CONTENTFUL_ACCESS_TOKEN_DELIVERY,
    environment: process.env.CONTENTFUL_ENVIRONMENT,
    host: preview ? 'preview.contentful.com' : 'cdn.contentful.com'
  })

  return client.getEntries({
    content_type: 'section',
    order: 'sys.createdAt'
  })
  .then((response) => {
    const ret = response.items.map(item => {
      return {
        ...item.fields,
        id: item.sys.id,
        cards: item.fields.cards && item.fields.cards.map(card => card.sys.id),
        cta: item.fields.cta && item.fields.cta.map(cta => cta.sys.id)
      }
    })

    return ret
  })
  .catch(console.error)
}
