const liquid = require('liquidjs')

const mediaTag = require('../../eleventy/mediaTag')
const mediaUrl = require('../../eleventy/mediaUrl')
const fileInfo = require('../../eleventy/fileInfo')

const cta = require('./data/cta')
const pages = require('./data/pages')
const components = require('./data/components')
const site = require('./data/site')

const path = require('path')

export default async (req, context) => {
  const urlParams = new URLSearchParams(req.url.split('?').pop())
  const id = urlParams.get('pageId')
  const pagesArray = await pages()
  const page = pagesArray.find(page => page.pageId === id)

  if(page) {
    const engine = new liquid.Liquid({
      root: path.resolve(__dirname, '../../site/_includes/'),
      extname: '.html'
    })

    engine.registerFilter('mediaTag', async function(data, props) {
      return mediaTag(data, props)
    })

    engine.registerFilter('mediaUrl', async function(data) {
      return mediaUrl(data)
    })

    engine.registerFilter('fileInfo', async function(data) {
      return fileInfo(data)
    })

    const l = await engine
      .renderFile("helpers/page", {
      'page': page,
      'components': await components(),
      'cta': await cta(),
      'site': await site()
    })

    return new Response(await l)
  } else {
    return new Response(`<div style="margin:auto">
      <p>Couldn't fetch this page.</p>
      <p>Please check the <code>id</code>.</p>
      <br>
      <p><code>id: ${id}</code></p>
    </div>`)
  }
}
