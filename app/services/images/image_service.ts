import cloudinary from 'cloudinary'
import UserImage from '#models/user_image'
import { MultipartFile } from '@adonisjs/core/bodyparser'

export default class ImageService {
  static async uploadImage(userId: number, images: MultipartFile[], isMain: boolean) {
    const existingImagesCount = await (await UserImage.query().where('user_id', userId)).length
    if (existingImagesCount + images.length > 10) {
      throw new Error('Cannot exceed a total of 10 images per account')
    }

    const uploadImages = await Promise.all(
      images.map(async (image) => {
        const result = await cloudinary.v2.uploader.upload(image.tmpPath!)
        return UserImage.create({
          userId,
          imageUrl: result.url,
          isMain,
        })
      })
    )
    return uploadImages
  }

  public async getUserImages(userId: number) {
    return UserImage.query().where('user_id', userId)
  }
}
