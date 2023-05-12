import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Account from 'App/Models/Account'
import Tag from 'App/Models/Tag'

export default class ScheduledTransaction extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public description: string

  @column()
  public amount: number

  @column()
  public day: number

  @column()
  public accountId: number

  @column()
  public endDate: DateTime

  @belongsTo(() => Account)
  public account: BelongsTo<typeof Account>

  @belongsTo(() => Tag)
  public tag: BelongsTo<typeof Tag>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
