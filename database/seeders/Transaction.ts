import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import TransactionFactory from 'Database/factories/TransactionFactory'

export default class extends BaseSeeder {
  public async run() {
    await TransactionFactory.createMany(120)
  }
}
