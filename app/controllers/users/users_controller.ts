import type { HttpContext } from '@adonisjs/core/http'
import UserService from '#services/user/user_service'

export default class UsersController {
  async updateProfile({ request, response, auth }: HttpContext): Promise<void> {
    try {
      const { bio, accountType } = request.only(['bio', 'accountType'])

      if (!auth.user) return response.unauthorized({ message: 'Utilisateur non authentifié' })
      const updatedUser = await UserService.updateUser(auth.user!.id, { bio, accountType })
      return response.ok({ message: 'Profil mis à jour avec succès', user: updatedUser })
    } catch (error) {
      return response.internalServerError({
        message: 'Erreur lors de la mise à jour du profil',
        error: error.message,
      })
    }
  }
}
