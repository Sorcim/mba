import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateScheduledTransactionValidator from 'App/Validators/CreateScheduledTransactionValidator'
import UpdateScheduledTransactionValidator from 'App/Validators/UpdateScheduledTransactionValidator'

export default class ScheduledTransactionsController {
  public async index({ response, auth, params, request }: HttpContextContract) {
    try {
      const account = await auth
        .user!.related('accounts')
        .query()
        .andWhere('accounts.id', params.account_id)
        .firstOrFail()

      const page = request.input('page', 1)
      const scheduledTransactions = await account
        .related('scheduledTransactions')
        .query()
        .paginate(page, 30)
      return response.json(scheduledTransactions.serialize())
    } catch (e) {
      return response.badRequest({ error: e.message })
    }
  }

  public async store({ params, request, response, auth }: HttpContextContract) {
    const payload = await request.validate(CreateScheduledTransactionValidator)
    try {
      const account = await auth
        .user!.related('accounts')
        .query()
        .andWhere('accounts.id', params.account_id)
        .firstOrFail()
      const scheduledTransaction = await account
        .related('scheduledTransactions')
        .create({ ...payload, accountId: params.account_id })
      return response.status(201).json(scheduledTransaction)
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

      const scheduledTransaction = await account
        .related('scheduledTransactions')
        .query()
        .where('id', params.id)
        .firstOrFail()
      return response.json(scheduledTransaction)
    } catch (e) {
      return response.badRequest({ error: e.message })
    }
  }

  public async update({ params, response, auth, request }: HttpContextContract) {
    const payload = await request.validate(UpdateScheduledTransactionValidator)
    try {
      const account = await auth
        .user!.related('accounts')
        .query()
        .andWhere('accounts.id', params.account_id)
        .firstOrFail()
      const scheduledTransaction = await account
        .related('scheduledTransactions')
        .query()
        .where('id', params.id)
        .firstOrFail()
      scheduledTransaction.merge(payload).save()
      return response.status(201).json(scheduledTransaction)
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

      const scheduledTransaction = await account
        .related('scheduledTransactions')
        .query()
        .where('id', params.id)
        .firstOrFail()
      await scheduledTransaction.delete()
      return response.status(204)
    } catch (e) {
      return response.badRequest({ error: e.message })
    }
  }
}
