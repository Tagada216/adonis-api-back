import type { HttpContext } from '@adonisjs/core/http'
import env from '#start/env'
import User from '#models/user'
import { AuthProviders } from '../../enums/auth-providers.enum.js'
import { isUniqueProvider } from '../auth/guards/auth_provider_guard.js'

export default class AuthFacebooksController {
  async redirect({ ally }: HttpContext) {
    await ally.use('facebook').redirect((request) => {
      request.scopes(['public_profile', 'email'])
    })
  }

  async handleCallback({ ally, response }: HttpContext) {
    const facebookUser = ally.use('facebook')

    if (facebookUser.accessDenied()) {
      return 'Access Denied'
    }

    if (facebookUser.stateMisMatch()) {
      return 'Request expired. Retry again'
    }

    if (facebookUser.hasError()) {
      return facebookUser.getError()
    }

    const user = await facebookUser.user()

    const isProviderVerified = await isUniqueProvider(user.email, AuthProviders.facebook)

    if (!isProviderVerified) {
      return response
        .status(400)
        .send({ message: `Already exists on other provider: ${AuthProviders.facebook}` })
    }

    const findUser = {
      email: user.email as string,
    }

    const userDetails = {
      email: user.email,
      fullName: user.original.first_name,
      provider: AuthProviders.facebook as string,
      providerId: user.id,
    }

    const newUser = await User.firstOrCreate(findUser, userDetails)

    const token = await User.accessTokens.create(newUser, ['*'], {
      expiresIn: env.get('JWT_EXPIRY'),
    })

    return response.ok({
      token: token,
      ...newUser.serialize(),
    })
  }
}
