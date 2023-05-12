import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateTransactionValidator from 'App/Validators/CreateTransactionValidator'
import UpdateTransactionValidator from 'App/Validators/UpdateTransactionValidator'

export default class TransactionsController {
  public async index({ params, response, auth, request }: HttpContextContract) {
    const { search, startDate, endDate } = request.qs()
    try {
      const account = await auth
        .user!.related('accounts')
        .query()
        .andWhere('accounts.id', params.account_id)
        .firstOrFail()
      const page = request.input('page', 1)
      const transactions = await account
        .related('transactions')
        .query()
        .if(search, (query) => query.whereLike('description', `%${search}%`))
        .if(startDate, (query) => query.where('date', '<=', startDate))
        .if(endDate, (query) => query.where('date', '>=', endDate))
        .orderBy('date', 'desc')
        .paginate(page, 30)
      return response.json(transactions.serialize())
    } catch (e) {
      return response.badRequest({ error: e.message })
    }
  }

  public async store({ params, request, response, auth }: HttpContextContract) {
    const payload = await request.validate(CreateTransactionValidator)
    try {
      const account = await auth
        .user!.related('accounts')
        .query()
        .andWhere('accounts.id', params.account_id)
        .firstOrFail()
      const transaction = await account
        .related('transactions')
        .create({ ...payload, accountId: params.account_id })
      return response.status(201).json(transaction)
    } catch (e) {
      return response.badRequest({ error: e.message })
    }
  }

  public async show({ params, response, auth }: HttpContextContract) {
    try {
      const account = await auth
        .user!.related('accounts')
        .query()
        .andWhere('accounts.id', params.account_id)
        .firstOrFail()

      const transactions = await account
        .related('transactions')
        .query()
        .where('id', params.id)
        .firstOrFail()
      return response.json(transactions)
    } catch (e) {
      return response.badRequest({ error: e.message })
    }
  }

  public async update({ params, response, auth, request }: HttpContextContract) {
    const payload = await request.validate(UpdateTransactionValidator)
    try {
      const account = await auth
        .user!.related('accounts')
        .query()
        .andWhere('accounts.id', params.account_id)
        .firstOrFail()
      const transaction = await account
        .related('transactions')
        .query()
        .where('id', params.id)
        .firstOrFail()
      transaction.merge(payload).save()
      return response.status(201).json(transaction)
    } catch (e) {
      return response.badRequest({ error: e.message })
    }
  }

  public async destroy({ params, response, auth }: HttpContextContract) {
    try {
      const account = await auth
        .user!.related('accounts')
        .query()
        .andWhere('accounts.id', params.account_id)
        .firstOrFail()

      const transactions = await account
        .related('transactions')
        .query()
        .where('id', params.id)
        .firstOrFail()
      await transactions.delete()
      return response.status(204)
    } catch (e) {
      return response.badRequest({ error: e.message })
    }
  }
}
