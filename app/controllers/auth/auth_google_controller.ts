import env from '#start/env'
import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { AuthProviders } from '../../enums/auth-providers.enum.js'

export default class AuthGoogleController {
  public async redirect({ ally }: HttpContext) {
    await ally.use('google').redirect()
  }

  public async handleCallback({ ally, response }: HttpContext) {
    const googleUser = ally.use('google')

    if (googleUser.accessDenied()) {
      return 'Access Denied'
    }

    if (googleUser.stateMisMatch()) {
      return 'Request expired. Retry again'
    }

    if (googleUser.hasError()) {
      return googleUser.getError()
    }

    const user = await googleUser.user()
    

    const findUser = {
      email: user.email as string,
    }

    

    const userDetails = {
      email: user.email,
      fullName: user.original.given_name,
      provider: AuthProviders.google as string,
      providerId: user.id,
    }
   

    const newUser = await User.firstOrCreate(findUser, userDetails)

    const token = await User.accessTokens.create(newUser, ['*'], {
      expiresIn: env.get('JWT_EXPIRY'),
    })
    
    
   return  response.ok({
      token: token,
      ...newUser.serialize()
    })
   
  }
}
