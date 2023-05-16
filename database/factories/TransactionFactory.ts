import Transaction from 'App/Models/Transaction'
import Factory from '@ioc:Adonis/Lucid/Factory'
import { DateTime } from 'luxon'

export default Factory.define(Transaction, ({ faker }) => {
  return {
    amount: parseFloat(faker.finance.amount(-100, 100)),
    description: faker.lorem.sentence(),
    date: DateTime.fromISO(faker.date.past().toJSON()),
    accountId: 6,
  }
}).build()
