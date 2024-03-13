module.exports = function(data) {
  if(!data) {
    return null
  }

  const url = data.fields.file && data.fields.file.url

  return url
}
