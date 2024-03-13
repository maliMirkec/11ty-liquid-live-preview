const { AssetCache } = require("@11ty/eleventy-fetch")
const components = require("../../contentful/components")

module.exports = async () => {
  let cache = new AssetCache("contentful_components")

  if(cache.isCacheValid("1d")) {
    return cache.getCachedValue()
  }

  const ret = await components()

  cache.save(ret, "json")

  return ret
}
