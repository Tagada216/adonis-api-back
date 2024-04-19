import type { HttpContext } from '@adonisjs/core/http'
import social_auth_service from '#services/auth/social_auth_service'

export default class AuthGoogleController {
  async redirect({ ally }: HttpContext) {
    await ally.use('google').redirect()
  }

  async handleCallback({ ally, response }: HttpContext) {
    const googleUser = ally.use('google')
    const result = await social_auth_service.handleGoogleCallback(googleUser)

    if (typeof result === 'string') {
      return response.badRequest({ message: result })
    }

    return response.ok({
      token: result.token,
      ...result.user.serialize(),
    })
  }
}
