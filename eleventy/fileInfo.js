module.exports = async function(data) {
  if(!data) {
    return false
  }

  const ret = {
    title: data.fields.title,
    file: data.fields.file
  }

  return ret
}
