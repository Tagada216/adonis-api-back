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
}
