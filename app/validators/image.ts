import vine from '@vinejs/vine'

export const createImagesValidator = vine.compile(
  vine.object({
    images: vine
      .array(
        vine.object({
          image: vine.file({
            size: '5mb',
            extnames: ['jpg', 'png', 'jpeg'],
          }),
          isMain: vine.boolean(),
        })
      )
      .maxLength(10),
  })
)
