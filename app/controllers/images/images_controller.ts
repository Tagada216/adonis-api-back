import type { HttpContext } from '@adonisjs/core/http'
import { createImagesValidator } from '#validators/image'
import ImageService from '#services/images/image_service'
export default class ImagesController {
  async store({ auth, request, response }: HttpContext) {
    const user = auth.user!

    await request.validateUsing(createImagesValidator)
    const images = request.files('images')

    try {
      if (images.length > 0) {
        const uploads = images.map(async (images) => {
          return ImageService.uploadImage(user.id, images, true)
        })

        await Promise.all(uploads)

        return response.ok({ message: 'Images uploaded successfully' })
      } else {
        return response.badRequest({ message: 'No images were uploaded' })
      }
    } catch (error) {
      return response.internalServerError({ message: error.message })
    }
  }

  async index({ auth, response }: HttpContext) {
    const userId = auth.user!.id
    try {
      const formattedImages = await ImageService.getUserImages(userId)
      return response.ok({ data: { images: formattedImages } })
    } catch (error) {
      return response.internalServerError({ message: 'An error occurred while fetching images.' })
    }
  }
  async destroy({ params, auth, response }: HttpContext) {
    try {
      await ImageService.deleteImage(auth.user!.id, Number(params.id))
      return response.ok({ message: 'Image delete successfully' })
    } catch (error) {
      return response.internalServerError({ message: error.message })
    }
  }
  async getAllByUserId({ request, response }: HttpContext) {
    const userId = request.param('user_id')

    try {
      const images = await ImageService.getUserImages(userId)
      return response.ok({ data: { images } })
    } catch (error) {
      console.log(error)
      return response.internalServerError({ message: 'An error occurred while fetching images.' })
    }
  }
}
