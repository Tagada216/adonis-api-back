import type { HttpContext } from '@adonisjs/core/http'
import activation_service from '#services/activation/activation_service'

export default class ActivationsController {
  async activate({ request, response }: HttpContext) {
    const email = request.input('email')
    const token = request.input('token')

    const isActivated = await activation_service.activateUser(email, token)

    if (!isActivated) {
      return response.badRequest({ message: 'Invalid activation token' })
    }
    return response.ok({ message: 'User activated' })
  }
}
