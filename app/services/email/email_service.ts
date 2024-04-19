import mail from '@adonisjs/mail/services/main'

class EmailService {
  async sendActivationEmail(email: string, token: string, urlBase?: string) {
    const activationUrl = `${urlBase}/activate?token=${token}&email=${encodeURIComponent(email)}`

    await mail.send((message) => {
      message
        .from('info@test.com')
        .to(email)
        .subject('Activate Your Account')
        .htmlView('emails/verify_email', { email, activationUrl })
    })
  }

  async sendResetPasswordEmail(email: string, resetPasswordUrl: string) {
    await mail.send((message) => {
      message
        .from('noreply@example.com')
        .to(email)
        .subject('Réinitialisation de votre mot de passe')
        .htmlView('emails/reset_password', { resetPasswordUrl })
    })
  }
}

export default new EmailService()
