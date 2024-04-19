import { BaseModel, column, belongsTo, computed } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import User from './user.js'

export default class Profile extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare firstName: string

  @column()
  declare userId: number

  @column()
  declare gender: string

  @column.date()
  declare dob: DateTime | null

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @computed()
  public get age(): number | null {
    if (!this.dob) {
      return null
    }
    return DateTime.now().diff(this.dob, 'years').years
  }
}
