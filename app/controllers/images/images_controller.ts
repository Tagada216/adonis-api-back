import type { HttpContext } from '@adonisjs/core/http'
import { createImagesValidator } from '#validators/image'
import ImageService from '#services/images/image_service'
export default class ImagesController {
  public async store({ auth, request, response }: HttpContext) {
    const user = auth.user!
    await request.validateUsing(createImagesValidator)
    const imagesData = request.input('images', [])

    try {
      const uploadedImagesPromises = imagesData.map(async (imagesData: any, index: number) => {
        const imageFile = imagesData.image
        const isMain = imagesData.isMain

        return ImageService.uploadImage(user.id, imageFile, isMain)
      })

      const uploadedImages = await Promise.all(uploadedImagesPromises)

      return response.ok({ message: 'Images uploaded successfully' })
    } catch (error) {
      return response.internalServerError({ message: error.message })
    }
  }
}
