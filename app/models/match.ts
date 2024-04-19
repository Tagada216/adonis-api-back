import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import User from '#models/user'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Match extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userOneId: number

  @column()
  declare userTwoId: number

  @column()
  declare status: string

  @belongsTo(() => User, {
    foreignKey: 'userOneId',
  })
  declare userOne: BelongsTo<typeof User>

  @belongsTo(() => User, {
    foreignKey: 'userTwoId',
  })
  declare userTwo: BelongsTo<typeof User>
}
