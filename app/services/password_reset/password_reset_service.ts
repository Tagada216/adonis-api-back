import { DateTime } from 'luxon'
import User from '#models/user'
import ResetPasswordToken from '#models/reset_password_token'
import { tokenUtils } from '../../utils/token_utils.js'
import EmailService from '#services/email/email_service'

class PasswordResetService {
  async requestPasswordReset(email: string, urlBase: string) {
    const user = await User.findBy('email', email)

    if (!user) {
      throw new Error('User not found')
    }

    const token = tokenUtils.generateToken()
    const expiresAt = DateTime.now().plus({ hours: 1 })

    await ResetPasswordToken.updateOrCreate(
      {
        userId: user.id,
      },
      {
        token: token,
        expiresAt: expiresAt,
      }
    )

    const resetPasswordUrl = `${urlBase}/reset-password?token=${token}`

    await EmailService.sendResetPasswordEmail(email, resetPasswordUrl)
  }

  async resetPassword(token: string, newPassword: string): Promise<boolean> {
    const resetToken = await ResetPasswordToken.query()
      .where('token', token)
      .andWhere('expires_at', '>', DateTime.now().toSQL())
      .first()

    if (!resetToken) {
      return false
    }

    const user = await User.findOrFail(resetToken.userId)

    user.password = newPassword
    await user.save()

    await resetToken.delete()

    return true
  }
}

export default new PasswordResetService()
