// Importez le nouveau service
import social_auth_service from '#services/auth/social_auth_service'
import { HttpContext } from '@adonisjs/core/http'

export default class AuthFacebooksController {
  async redirect({ ally }: HttpContext) {
    await ally.use('facebook').redirect((request) => {
      request.scopes(['public_profile', 'email'])
    })
  }

  async handleCallback({ ally, response }: HttpContext) {
    const facebookUser = ally.use('facebook')

    const result = await social_auth_service.handleFacebookCallback(facebookUser)

    if (typeof result === 'string') {
      return response.badRequest({ message: result })
    }

    return response.ok({
      token: result.token,
      ...result.user.serialize(),
    })
  }
}
