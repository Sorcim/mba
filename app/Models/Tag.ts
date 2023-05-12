import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Transaction from 'App/Models/Transaction'
import ScheduledTransaction from 'App/Models/ScheduledTransaction'

export default class Tag extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public icon: string | null

  @hasMany(() => Transaction)
  transactions: HasMany<typeof Transaction>

  @hasMany(() => ScheduledTransaction)
  scheduledTransactions: HasMany<typeof ScheduledTransaction>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
