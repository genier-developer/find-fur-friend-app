export const resizeImage = (file: File, width: number, height: number): Promise<File> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)

    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      if (!ctx) {
        reject(new Error('Canvas context not available'))
        return
      }

      canvas.width = width
      canvas.height = height

      const cropSize = Math.min(img.width, img.height)
      const cropWidth = cropSize
      const cropHeight = cropSize
      const offsetX = (img.width - cropWidth) / 2
      const offsetY = (img.height - cropHeight) / 2

      ctx.drawImage(img, offsetX, offsetY, cropWidth, cropHeight, 0, 0, width, height)

      canvas.toBlob(blob => {
        if (blob) {
          const resizedFile = new File([blob], file.name, { type: file.type })
          resolve(resizedFile)
        } else {
          reject(new Error('Failed to create resized image blob'))
        }
        URL.revokeObjectURL(url)
      }, file.type)
    }

    img.onerror = () => {
      reject(new Error('Failed to load image'))
      URL.revokeObjectURL(url)
    }

    img.src = url
  })
}
