import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Transaction from 'App/Models/Transaction'
import ScheduledTransaction from 'App/Models/ScheduledTransaction'
import { afterFetch, afterFind, computed } from '@adonisjs/lucid/build/src/Orm/Decorators'

export default class Account extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public startBalance: number

  @computed()
  public currentBalance: number

  @computed()
  public valideBalance: number

  @manyToMany(() => User, {
    pivotTable: 'account_users',
  })
  public users: ManyToMany<typeof User>

  @hasMany(() => Transaction)
  public transactions: HasMany<typeof Transaction>

  @hasMany(() => ScheduledTransaction)
  public scheduledTransactions: HasMany<typeof ScheduledTransaction>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @afterFind()
  public static async afterFind(account: Account) {
    account.currentBalance = await Transaction.query()
      .sum('amount', 'currentBalance')
      .where('account_id', account.id)
      .then((data) => account.startBalance + data[0].$extras.currentBalance)

    account.valideBalance = await Transaction.query()
      .sum('amount', 'currentBalance')
      .where('account_id', account.id)
      .andWhereNotNull('checkedAt')
      .then((data) => account.startBalance + data[0].$extras.currentBalance)
  }

  @afterFetch()
  public static async afterFetch(accounts: Account[]) {
    await Promise.all(
      accounts.map(async (account) => {
        account.currentBalance = await Transaction.query()
          .sum('amount', 'currentBalance')
          .where('account_id', account.id)
          .then((data) => account.startBalance + data[0].$extras.currentBalance)
      })
    )
  }
}
