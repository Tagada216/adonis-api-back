import Swipe from '#models/swipe'
import Match from '#models/match'
import { SwipeDirection } from '../../enums/swipe-direction.enum.js'

class SwipeService {
  async handleSwipe(userId: number, targetUserId: number, direction: string): Promise<any> {
    await Swipe.create({
      userId,
      targetUserId,
      direction,
    })

    if (direction == SwipeDirection.right) {
      const existingSwipe = await Swipe.query()
        .where('userId', targetUserId)
        .andWhere('targetUserId', userId)
        .andWhere('direction', SwipeDirection.right)
        .first()

      if (existingSwipe) {
        const existingMatch = await Match.query()
          .where((query) => {
            query.where('userOneId', userId).andWhere('userTwoId', targetUserId)
          })
          .orWhere((query) => {
            query.where('userOneId', targetUserId).andWhere('userTwoId', userId)
          })
          .first()

        if (!existingMatch) {
          await Match.create({
            userOneId: userId,
            userTwoId: targetUserId,
            status: 'matched',
          })
          return true
        }
      }
      return false
    }
  }
}
export default new SwipeService()
