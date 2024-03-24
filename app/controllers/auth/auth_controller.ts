import env from '#start/env'
import type { HttpContext } from '@adonisjs/core/http'
import { registerValidator, loginValidator } from '#validators/auth'
import User from '#models/user'
import type {RegisterRequest} from "#controllers/interfaces/register.interface"
import type { UserInterface } from '#controllers/interfaces/user.interface'

export default class AuthController {
  async register({ request, response }: HttpContext):Promise<void>{
    const payload: RegisterRequest = await request.validateUsing(registerValidator)
  
    const user: UserInterface = await User.create(payload)
    return response.status(201).json(user)
  }

  async login({ request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(email, password)

    const token = await User.accessTokens.create(user, ['*'], {
      expiresIn: env.get('JWT_EXPIRY'),
    })

    return response.ok({
      token: token,
      ...user.serialize(),
    })
  }
}
