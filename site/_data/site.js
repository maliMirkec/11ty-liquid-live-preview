const { AssetCache } = require("@11ty/eleventy-fetch")
const site = require("../../contentful/site")

module.exports = async () => {
  let cache = new AssetCache("contentful_site")

  if(cache.isCacheValid("1d")) {
    return cache.getCachedValue()
  }

  const ret = await site()

  cache.save(ret, "json")

  return ret
}
