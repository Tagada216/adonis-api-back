import UserImage from '#models/user_image'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class IsOwnerMiddleware {
  async handle({ auth, response, params }: HttpContext, next: NextFn) {
    const resourceId = params.id
    const user = auth.user

    if (!user) {
      return response.unauthorized({ message: 'You must be logged in to perform this action' })
    }

    try {
      const resource = await UserImage.findOrFail(resourceId)
      if (resource.userId !== user.id) {
        return response.forbidden({ message: 'You are not the owner of this resource' })
      }
      await next()
    } catch (error) {
      return response.notFound({ message: 'Resource not found' })
    }
  }
}
