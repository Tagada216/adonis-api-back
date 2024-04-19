import type { HttpContext } from '@adonisjs/core/http'
import swipe_service from '#services/swipe/swipe_service'
export default class SwipesController {
  async swipe({ request, auth, response }: HttpContext): Promise<void> {
    const userId = auth.user!.id

    const { targetUserId, direction } = request.only(['targetUserId', 'direction'])

    try {
      const isMatch = await swipe_service.handleSwipe(userId, targetUserId, direction)

      if (isMatch) {
        return response.ok({ message: "It's a match!" })
      } else {
        return response.ok({ message: 'Swipe registered, no match.' })
      }
    } catch (error) {
      return response.internalServerError({ error: 'Failed to process swipe' })
    }
  }
}
