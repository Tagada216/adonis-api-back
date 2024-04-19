import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'

export default class Swipe extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare targetUserId: number

  @column()
  declare direction: string

  @column.dateTime()
  declare swipeDate: DateTime
}
