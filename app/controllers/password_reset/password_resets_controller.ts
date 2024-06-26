import type { HttpContext } from '@adonisjs/core/http'
import password_reset_service from '#services/password_reset/password_reset_service'
import env from '#start/env'
import { forgotPasswordValidator, resetPasswordValidator } from '#validators/auth'

export default class PasswordResetsController {
  async forgot({ request, response }: HttpContext) {
    const payload = await request.validateUsing(forgotPasswordValidator)
    const email = payload.email

    await password_reset_service.requestPasswordReset(email, env.get('BASE_URL') as string)

    return response.ok({ message: 'Password reset email sent' })
  }

  async reset({ request, response }: HttpContext) {
    await request.validateUsing(resetPasswordValidator)
    const { token, newPassword } = request.all()
    const resetSuccessful = await password_reset_service.resetPassword(token, newPassword)

    if (!resetSuccessful) {
      return response.badRequest({ message: 'Invalid or expired token' })
    }

    return response.ok({ message: 'Password reset successful' })
  }
}
