import User from '#models/user'

class UserService {
  async updateUser(userId: number, updateData: object): Promise<User> {
    const user = await User.findOrFail(userId)
    user.merge(updateData)
    await user.save()
    return user
  }
}

export default new UserService()
