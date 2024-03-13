module.exports = async function(data, props) {
  if(!data || !props) {
    return null
  }


  const file = data.fields.file

  if(!file) {
    return null
  }

  const settings = JSON.parse(props)

  if(file.contentType.includes('image')) {
    if(file.contentType.includes('svg') || file.contentType.includes('gif')) {
      let mediaWidth, mediaHeight

      if(file.contentType.includes('gif')) {
        mediaWidth = file.details.image.width
        mediaHeight = file.details.image.height
      } else {
        mediaWidth = settings.width || file.details.image.width
        mediaHeight = settings.height || file.details.image.height
      }

      if(settings.preload) {
        return `<link rel="preload" as="image" href="${file.url}">`
      } else {
        return `<img src="${file.url}" alt="${settings.alt || data.fields.title}" width="${mediaWidth}" height="${mediaHeight}"${settings.lazy ? ' loading="lazy"' : ''}>`
      }
    } else {
      let mediaRatio, mediaWidth, mediaHeight

      if(settings.width) {
        mediaRatio = settings.width ? settings.width / file.details.image.width : 1

        if(mediaRatio > 1) {
          mediaWidth = file.details.image.width
          mediaHeight = file.details.image.height
        } else {
          mediaWidth = settings.width
          mediaHeight = Math.round(file.details.image.height * mediaRatio)
        }
      }

      if(settings.height) {
        mediaRatio = settings.height ? settings.height / file.details.image.height : 1
        if(mediaRatio > 1) {
          mediaWidth = file.details.image.width
          mediaHeight = file.details.image.height
        } else {
          mediaHeight = settings.height
          mediaWidth = Math.round(file.details.image.width * mediaRatio)
        }
      }

      if(!mediaHeight) {
        mediaHeight = file.details.image.height
      }

      if(!mediaWidth) {
        mediaWidth = file.details.image.width
      }

      if(settings.preload) {
        return `<link rel="preload" as="image" imagesrcset="${file.url}?w=${mediaWidth*2}&fm=webp 2x, ${file.url}?w=${mediaWidth}&fm=webp">`
      } else {
        return `
          <img src="${file.url}?w=${mediaWidth}&fm=webp" srcset="${file.url}?w=${mediaWidth*2}&fm=webp 2x, ${file.url}?w=${mediaWidth}&fm=webp" alt="${settings.alt || data.fields.title}" width="${mediaWidth}" height="${mediaHeight}"${settings.lazy ? ' loading="lazy" fetchpriority="low"' : 'fetchpriority="high"'}>`
      }
    }
  } else if(file.contentType.includes('video')) {
    let srcAttribute = settings.lazy ? 'data-src' : 'src'
    let videoSource = `<source ${srcAttribute}="${file.url}" type="${file.contentType}">`

    return `<video${settings.inline ? ' muted loop autoplay playsinline' : ''}${settings.player ? ' muted controls playsinline' : ''}${settings.onDemand ? ' playsinline' : ''}${settings.lazy ? ' class="lazy" fetchpriority="low"' : 'fetchpriority="high"'}>
      ${videoSource}
    </video>`
  }

  return data
}
