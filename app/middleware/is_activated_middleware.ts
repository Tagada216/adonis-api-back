import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class IsActivatedMiddleware {
  async handle({ auth, response }: HttpContext, next: NextFn) {
    if (!auth.user) {
      return response.unauthorized({ message: 'User not authenticated' })
    }

    if (!auth.user.is_activated) {
      return response.forbidden({ message: 'Account not activated' })
    }

    await next()
  }
}
