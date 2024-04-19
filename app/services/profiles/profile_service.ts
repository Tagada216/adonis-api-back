import env from '#start/env'
import User from '#models/user'
import Profile from '#models/profile'
import { DateTime } from 'luxon'

class ProfilesService {
  async createProfile(userId: number, profileData: any) {
    const user = await User.find(userId)

    if (!user) {
      throw new Error('User not found')
    }

    const profiles = await user!.related('profiles').query()
    if (profiles.length >= 2) {
      throw new Error('Maximum de deux profils par utilisateur autorisé.')
    }

    if (profileData.dob) {
      const dob = DateTime.fromISO(new Date(profileData.dob).toISOString())

      if (!dob.isValid) {
        throw new Error('Invalid date of birth format')
      }
      profileData.dob = dob
    }

    const profile = await Profile.create({
      ...profileData,
      userId: user.id,
    })
    return profile
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

  async selectProfile(userId: number, profileId: number) {
    const user = await User.find(userId)

    if (!user) {
      throw new Error('User not found')
    }

    const profile = await Profile.find(profileId)
    if (!profile || profile.userId !== userId) {
      throw new Error('Profile not found or access denied')
    }

    const token = await User.accessTokens.create(user, ['*'], {
      name: `selected_id:${profileId}`,
      expiresIn: env.get('JWT_EXPIRY'),
    })

    return { token }
  }
}

export default new ProfilesService()
