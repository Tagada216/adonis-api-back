import User from '#models/user'
import { AuthProviders } from '../../../enums/auth-providers.enum.js'
import type { HttpContext } from '@adonisjs/core/http'

export async function verifyProvider(
  email: string,
  currentProvider: AuthProviders
): Promise<Boolean> {
  const existingUser = await User.query().where('email', email).first()
  if (existingUser) {
    if (existingUser.provider !== currentProvider) {
      return false
    }
  }
  return true
}
