import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class Profile extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare firstName: string

  @column()
  declare userId: number

  @column()
  declare age: number

  @column()
  declare gender: string

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
