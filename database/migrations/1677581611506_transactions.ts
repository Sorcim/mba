import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'transactions'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.date('checked_at').nullable()
      table.integer('tag_id').unsigned().references('tags.id').onDelete('CASCADE').nullable()
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('checked_at')
      table.dropColumn('tag_id')
    })
  }
}
