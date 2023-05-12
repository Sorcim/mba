import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'accounts'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('update_balance')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.date('update_balance').defaultTo(0)
    })
  }
}
