const mediaTag = require('./eleventy/mediaTag')
const mediaUrl = require('./eleventy/mediaUrl')
const fileInfo = require('./eleventy/fileInfo')

require('dotenv').config()

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    'assets': '.'
  })

  eleventyConfig.setLiquidOptions({
    extname: '.html'
  })

  eleventyConfig.addLiquidFilter('mediaTag', async function(data, props) {
    return mediaTag(data, props)
  })

  eleventyConfig.addLiquidFilter('mediaUrl', async function(data) {
    return mediaUrl(data)
  })

  eleventyConfig.addLiquidFilter('fileInfo', async function(data) {
    return fileInfo(data)
  })

  return {
    dir: {
      input: 'site',
      output: 'dist'
    }
  }
}
