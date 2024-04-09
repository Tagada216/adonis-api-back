import type { ApplicationService } from '@adonisjs/core/types'
import env from '#start/env'
import { v2 as cloudinary } from 'cloudinary'

export default class CloudinaryProvider {
  constructor(protected app: ApplicationService) {}

  /**
   * Register bindings to the container
   */
  register() {
    cloudinary.config({
      cloud_name: env.get('CLOUDINARY_NAME'),
      api_key: env.get('CLOUDINARY_API_KEY'),
      api_secret: env.get('CLOUDINARY_API_SECRET'),
    })
  }

  /**
   * The container bindings have booted
   */
  async boot() {}

  /**
   * The application has been booted
   */
  async start() {}

  /**
   * The process has been started
   */
  async ready() {}

  /**
   * Preparing to shutdown the app
   */
  async shutdown() {}
}
