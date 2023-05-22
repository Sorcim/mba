import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'accounts'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('updated_balance')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.date('updated_balance').defaultTo(0)
    })
  }
}
