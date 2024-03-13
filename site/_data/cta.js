const { AssetCache } = require("@11ty/eleventy-fetch")
const cta = require("../../contentful/cta")

module.exports = async () => {
  let cache = new AssetCache("contentful_cta")

  if(cache.isCacheValid("1d")) {
    return cache.getCachedValue()
  }

  const ret = await cta()

  cache.save(ret, "json")

  return ret
}
