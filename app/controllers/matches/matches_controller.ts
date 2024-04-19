import type { HttpContext } from '@adonisjs/core/http'
import match_service from '#services/match/match_service'

export default class MatchesController {
  public async getAllMatches({ auth, response }: HttpContext): Promise<void> {
    const userId = auth.user!.id
    try {
      const matches = await match_service.getAllMatchForUser(userId)
      return response.ok(matches)
    } catch (error) {
      console.error('Error retrieving matches:', error)
      return response.internalServerError({ message: 'Failed to retrieve matches' })
    }
  }

  public async deleteMatch({ request, auth, response }: HttpContext) {
    const { matchId } = request.params()

    const userId = auth.user!.id

    try {
      const success = await match_service.deleteMatch(matchId, userId)
      if (success) {
        return response.ok({ message: 'Match deleted successfully' })
      } else {
        return response.badRequest({ message: 'Match not found or permission denied' })
      }
    } catch (error) {
      return response.internalServerError({ message: 'Failed to process request' })
    }
  }
}
