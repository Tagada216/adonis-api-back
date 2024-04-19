import type { HttpContext } from '@adonisjs/core/http'
import location_service from '#services/location/location_service'
import type { LocationInterface } from '../../controllers/interfaces/location.interface.js'

export default class LocationsController {
  public async update({ request, auth, response }: HttpContext): Promise<void> {
    const locationData: LocationInterface = request.only([
      'city',
      'latitude',
      'longitude',
      'country',
    ])
    try {
      const user = auth.user!
      const updatedUser = await location_service.updateLocation(user.id, locationData)
      return response.ok({ message: 'Location updated successfully', data: updatedUser })
    } catch (error) {
      console.error('Error updating location:', error)
      return response.internalServerError({
        message: 'Failed to update location',
        error: error.message,
      })
    }
  }
}
