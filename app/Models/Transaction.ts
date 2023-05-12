import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Account from 'App/Models/Account'
import Tag from 'App/Models/Tag'

export default class Transaction extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public amount: number

  @column()
  public description: string

  @column.date()
  public date: DateTime

  @column.dateTime()
  public checkedAt: DateTime | null

  @column()
  public accountId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Account)
  public account: BelongsTo<typeof Account>

  @belongsTo(() => Tag)
  public tag: BelongsTo<typeof Tag>
}
