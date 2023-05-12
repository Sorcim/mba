import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'account_users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('users.id')
      table.integer('account_id').unsigned().references('accounts.id')
      table.unique(['user_id', 'account_id'])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
