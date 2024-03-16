const pages = require("../../../contentful/pages")

module.exports = async function() {
  return await pages(true)
}
