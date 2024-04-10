import cloudinary from 'cloudinary'
import UserImage from '#models/user_image'
import { MultipartFile } from '@adonisjs/core/bodyparser'
import type { ImagesFrontDataInterface } from '../interfaces/imagesFrontInterface.js'
import { extractPublicIdFromUrl } from './helper/cloudinary_helper.js'

export default class ImageService {
  static async uploadImage(userId: number, image: MultipartFile, isMain: boolean) {
    const existingImagesCount = (await UserImage.query().where('user_id', userId)).length

    if (existingImagesCount >= 10) {
      throw new Error('Cannot exceed a total of 10 images per account')
    }

    const result = await cloudinary.v2.uploader.upload(image.tmpPath!)

    const uploadedImage = await UserImage.create({
      userId: userId,
      imageUrl: result.url,
      isMain: isMain,
    })

    return uploadedImage
  }

  static async getUserImages(userId: number): Promise<ImagesFrontDataInterface[]> {
    const images = await UserImage.query().where('user_id', userId)

    return images.map((image) => ({
      id: image.id,
      url: image.imageUrl,
      isMain: image.isMain,
    }))
  }

  static async deleteImage(userId: number, imageId: number) {
    const image = await UserImage.query()
      .where('id', imageId)
      .andWhere('user_id', userId)
      .firstOrFail()

    const publicId = extractPublicIdFromUrl(image.imageUrl)

    await cloudinary.v2.uploader.destroy(publicId, (error, result) => {
      if (error) throw new Error(`Failed to delete image from Cloudinary: ${error.message}`)
    })
    await image.delete()
  }
}
