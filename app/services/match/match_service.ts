import Match from '#models/match'

class MatchService {
  async getAllMatchForUser(userId: number): Promise<Match[]> {
    return Match.query()
      .where('userOneId', userId)
      .orWhere('userTwoId', userId)
      .preload('userOne')
      .preload('userTwo')
  }

  async deleteMatch(matchId: number, userId: number): Promise<boolean> {
    const match = await Match.find(matchId)
    if (match && (match.userOneId === userId || match.userTwoId === userId)) {
      await match.delete()
      return true
    }
    return false
  }
}

export default new MatchService()
