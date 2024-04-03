import mail from '@adonisjs/mail/services/main'

export default class EmailService {
  static async verifyEmail(email: string, token: string) {
    await mail.send((message) => {
      message
        .from('info@test.com')
        .to(email)
        .subject('Verify Email')
        .htmlView('emails/verify_email', { token })
    })
  }
  static async resetPassword(email: string, token: string) {
    await mail.send((message) => {
      message
        .from('info@test.com')
        .to(email)
        .subject('Reset Password')
        .htmlView('emails/reset_password', { token })
    })
  }

  static async sendActivationEmail(email: string, token: string, urlBase?: string) {
    const activationUrl = `${urlBase}/activate?token=${token}&email=${encodeURIComponent(email)}`

    await mail.send((message) => {
      message
        .from('info@test.com')
        .to(email)
        .subject('Activate Your Account')
        .htmlView('emails/activate_account', { activationUrl })
    })
  }
  static async sendResetPasswordEmail(email: string, resetPasswordUrl: string) {
    await mail.send((message) => {
      message
        .from('noreply@example.com')
        .to(email)
        .subject('Réinitialisation de votre mot de passe')
        .htmlView('emails/reset_password', { resetPasswordUrl })
    })
  }
}
