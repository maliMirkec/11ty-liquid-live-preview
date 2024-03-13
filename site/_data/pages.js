const { AssetCache } = require("@11ty/eleventy-fetch")
const pages = require("../../contentful/pages")

module.exports = async () => {
  let cache = new AssetCache("contentful_pages")

  if(cache.isCacheValid("1d")) {
    return cache.getCachedValue()
  }

  const ret = await pages()

  cache.save(ret, "json")

  return ret
}
