import type { HttpContext } from '@adonisjs/core/http'
import profile_service from '#services/profiles/profile_service'
import { profileValidator } from '#validators/profile'
import { messages } from '@vinejs/vine/defaults'

export default class ProfilesController {
  async addProfile({ auth, request, response }: HttpContext): Promise<void> {
    const user = auth.user!
    const payload = await request.validateUsing(profileValidator)
    const profile = await profile_service.createProfile(user.id, payload)
    return response.status(201).json(profile)
  }

  async getProfiles({ auth, response }: HttpContext): Promise<void> {
    try {
      if (!auth.user) {
        return response.unauthorized({ message: 'User is not authenticated' })
      }

      const profiles = await profile_service.myProfiles(auth.user)

      return response.ok(profiles)
    } catch (error) {
      return response.internalServerError({
        message: 'Unable to fetch profiles',
        error: error.message,
      })
    }
  }

  async getProfilesByUser({ params, response }: HttpContext): Promise<void> {
    try {
      const profiles = await profile_service.getAllByUserId(params.user_id)
      return response.ok(profiles)
    } catch (error) {
      return response.status(404).send({ message: 'User not found' })
    }
  }

  async delete({ auth, params, response }: HttpContext) {
    try {
      if (!auth.user) {
        return response.unauthorized({ message: 'User is not authenticated' })
      }

      const profileId = parseInt(params.profileId, 10)
      await profile_service.deleteProfile(auth.user, profileId)

      return response.ok({ message: 'Profile deleted successfully' })
    } catch (error) {
      return response.internalServerError({
        message: 'Unable to delete profile',
        error: error.message,
      })
    }
  }

  async selectProfile({ request, auth, response }: HttpContext) {
    try {
      const { profileId } = request.only(['profileId'])

      if (!auth.user) {
        return response.unauthorized({ message: 'Authentication required' })
      }

      const token = await profile_service.selectProfile(auth.user!.id, profileId)
      return response.ok({ messages: 'Succefuly selected', token })
    } catch (error) {
      return response.status(400).send({ message: error.message })
    }
  }
}
