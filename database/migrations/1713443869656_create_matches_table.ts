import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'matches'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('user_one_id').unsigned().references('id').inTable('users')
      table.integer('user_two_id').unsigned().references('id').inTable('users')

      table.enu('status', ['matched', 'pending']).defaultTo('pending')
      table.timestamps(true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
