import { Liquid } from 'liquidjs'

import mediaTag from '../../eleventy/mediaTag'
import mediaUrl from '../../eleventy/mediaUrl'
import fileInfo from '../../eleventy/fileInfo'

import cta from './data/cta'
import pages from './data/pages'
import components from './data/components'
import site from './data/site'

export default async (req, context) => {
  const urlParams = new URLSearchParams(req.url.split('?').pop())
  const id = urlParams.get('pageId')
  const pagesArray = await pages()
  const page = pagesArray.find(page => page.pageId === id)

  if(page) {
    const engine = new Liquid({
      root: './site/_includes/',
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
