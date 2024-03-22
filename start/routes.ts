/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const AuthController = () => import('#controllers/auth_controller')
const AuthGoogleController = () => import('#controllers/auth_google_controller')

router
  .group(() => {
    router
      .group(() => {
        router.group(() => {
          router.post('register', [AuthController, 'register'])
          router.post('login', [AuthController, 'login'])
        })
        router
          .group(() => {
            router.get('google-signin', [AuthGoogleController, 'redirect'])
            router.get('google-signin-callback', [AuthGoogleController, 'handleCallback'])
          })
          .prefix('auth') // Basic Auth routes ---

        router
          .get('me', async ({ auth, response }) => {
            try {
              const user = auth.getUserOrFail()
              return response.ok(user)
            } catch (error) {
              return response.unauthorized({
                message: 'You are not authorized to access this resource',
              })
            }
          })
          .use(middleware.auth()) // Protected routes ---
      })
      .prefix('v1')
  })
  .prefix('api')
