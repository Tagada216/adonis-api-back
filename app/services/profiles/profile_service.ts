import User from '#models/user'
import Profile from '#models/profile'

class ProfilesService {
  async createProfile(userId: number, profileData: any) {
    const user = await User.find(userId)
    const profiles = await user!.related('profiles').query()
    if (profiles.length >= 2) {
      throw new Error('Maximum de deux profils par utilisateur autorisé.')
    }
    if (user) {
      const profile = await Profile.create({
        ...profileData,
        userId: user.id,
      })
      return profile
    }
    throw new Error('User not found')
  }

  async getAllByUserId(user_id: string) {
    try {
      const user = await User.findOrFail(user_id)
      const profiles = await user.related('profiles').query()

      return profiles
    } catch (error) {
      throw new Error('User not found')
    }
  }

  async myProfiles(user: User) {
    return await user.related('profiles').query()
  }

  async deleteProfile(user: User, profileId: number) {
    const profile = await user.related('profiles').query().where('id', profileId).first()
    if (!profile) {
      throw new Error('Profile not found or access denied')
    }
    await profile.delete()
    return true
  }
}

export default new ProfilesService()
