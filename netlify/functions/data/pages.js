import contentful from 'contentful'

export default async () => {
  const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN_PREVIEW,
    environment: process.env.CONTENTFUL_ENVIRONMENT,
    host: 'preview.contentful.com'
  })

  return client.getEntries({
    content_type: 'page',
    order: 'sys.createdAt',
    limit: 1000
  })
  .then((response) => {
    const ret = response.items.map(item => {
      const fields = {
        ...item.fields,
        pageId: item.sys.id,
        components: item.fields.components && item.fields.components.map(component => {
          return {
            id: component.sys.id,
            type: component.sys.contentType.sys.id
          }
        })
      }

      return fields
    })

    return ret
  })
  .catch(console.error)
}
