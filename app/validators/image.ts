import vine from '@vinejs/vine'

export const createImagesValidator = vine.compile(
  vine.object({
    images: vine
      .array(
        vine.file({
          size: '5mb',
          extnames: ['jpg', 'png', 'jpeg'],
        })
      )
      .maxLength(10),
  })
)
