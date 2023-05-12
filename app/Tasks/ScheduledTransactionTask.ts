import { TaskContract } from '@ioc:StouderIO/Scheduler'
import { DateTime } from 'luxon'
import ScheduledTransaction from 'App/Models/ScheduledTransaction'
import Account from 'App/Models/Account'
import Logger from '@ioc:Adonis/Core/Logger'

export default class ScheduledTransactionTask implements TaskContract {
  public readonly name: string = 'ScheduledTransactionTask'
  public readonly cron: string = '10 0 * * *'

  public async run(): Promise<void> {
    const currentDate = DateTime.now()
    Logger.info(currentDate.toFormat('yyyy-MM-dd HH:mm:ss') + ' - ScheduledTransactionTask START')
    const scheduledTransactions = await ScheduledTransaction.query()
      .where('endDate', '>=', currentDate.toISODate())
      .andWhere('day', currentDate.day)
    await Promise.all(
      scheduledTransactions.map(async (scheduledTransactions) => {
        const account = await Account.findOrFail(scheduledTransactions.accountId)
        await account.related('transactions').create({
          amount: scheduledTransactions.amount,
          description: scheduledTransactions.description,
          date: currentDate,
        })
      })
    )
    Logger.info(DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss') + ' - ScheduledTransactionTask END')
  }
}
