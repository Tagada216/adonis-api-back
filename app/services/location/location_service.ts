import User from '#models/user'
import type { LocationInterface } from '../../controllers/interfaces/location.interface.js'
class LocationService {
  async updateLocation(userId: number, locationData: LocationInterface): Promise<User> {
    const user = await User.findOrFail(userId)
    user.merge(locationData)
    await user.save()
    return user
  }
}

export default new LocationService()
