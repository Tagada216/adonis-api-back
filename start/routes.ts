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
import MatchesController from '#controllers/matches/matches_controller'

const AuthController = () => import('#controllers/auth/auth_controller')
const AuthGoogleController = () => import('#controllers/auth/auth_google_controller')
const AuthFacebookController = () => import('#controllers/auth/auth_facebook_controller')
const ActivationsController = () => import('#controllers/activation/activations_controller')
const PasswordResetsController = () =>
  import('#controllers/password_reset/password_resets_controller')
const ImagesController = () => import('#controllers/images/images_controller')
const ProfilesController = () => import('#controllers/profiles/profiles_controller')
const UsersController = () => import('#controllers/users/users_controller')
const SwipesController = () => import('#controllers/swipes/swipes_controller')

router
  .group(() => {
    router
      .group(() => {
        router
          .group(() => {
            router.post('register', [AuthController, 'register'])
            router.post('login', [AuthController, 'login'])

            router.get('google/redirect', [AuthGoogleController, 'redirect'])
            router.get('google/signin/callback', [AuthGoogleController, 'handleCallback'])

            router.get('facebook/redirect', [AuthFacebookController, 'redirect'])
            router.get('facebook/signin/callback', [AuthFacebookController, 'handleCallback'])
          })
          .prefix('auth') //  Auth  ---

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

        router
          .group(() => {
            // - Account route
            router.post('activate', [ActivationsController, 'activate'])
            router.post('forgot-password', [PasswordResetsController, 'forgot'])
            router.post('reset-password', [PasswordResetsController, 'reset'])

            // - images routes
            router.get('images', [ImagesController, 'index']).use(middleware.auth())
            router.get(':user_id/images', [ImagesController, 'getAllByUserId'])
            router.post('image', [ImagesController, 'store']).use(middleware.auth())
            router
              .delete('image/:id', [ImagesController, 'destroy'])
              .use([middleware.auth(), middleware.isOwner()])

            // - Profile routes
            router.post('profile', [ProfilesController, 'addProfile']).use(middleware.auth())
            router.get('profiles/me', [ProfilesController, 'getProfiles']).use(middleware.auth())
            router
              .get(':user_id/profile', [ProfilesController, 'getProfilesByUser'])
              .use(middleware.auth())
            router
              .delete('profile/:profileId', [ProfilesController, 'delete'])
              .use(middleware.auth())
            router
              .post('select-profile', [ProfilesController, 'selectProfile'])
              .use(middleware.auth())

            // -- User routes
            router.put('update-profile', [UsersController, 'updateProfile']).use(middleware.auth())

            //-- Matches route
            router.get('matches', [MatchesController, 'getAllMatches']).use(middleware.auth())
            router
              .delete('match/:matchId', [MatchesController, 'deleteMatch'])
              .use(middleware.auth())
          })
          .prefix('user') // User routes ---

        router
          .group(() => {
            router.post('swipe', [SwipesController, 'swipe']).use(middleware.auth())
          })
          .prefix('actions') // Actions route
      })
      .prefix('v1')
  })
  .prefix('api')
