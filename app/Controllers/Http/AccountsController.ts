import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateAccountValidator from 'App/Validators/CreateAccountValidator'
import UpdateAccountValidator from 'App/Validators/UpdateAccountValidator'

export default class AccountsController {
  public async index({ response, auth }: HttpContextContract) {
    try {
      const accounts = await auth.user!.related('accounts').query().paginate(1)
      return response.json(accounts.serialize())
    } catch (e) {
      return response.badRequest({ error: e.message })
    }
  }

  public async store({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(CreateAccountValidator)
    try {
      const user = auth.user!
      const account = await user.related('accounts').create({ ...payload })
      return response.status(201).json(account)
    } catch (e) {
      return response.badRequest({ error: e.message })
    }
  }

  public async show({ params, response, auth }: HttpContextContract) {
    try {
      const account = await auth
        .user!.related('accounts')
        .query()
        .andWhere('accounts.id', params.id)
        .firstOrFail()
      return response.json(account)
    } catch (e) {
      return response.badRequest({ error: e.message })
    }
  }

  public async update({ params, response, auth, request }: HttpContextContract) {
    const payload = await request.validate(UpdateAccountValidator)
    try {
      const account = await auth
        .user!.related('accounts')
        .query()
        .andWhere('accounts.id', params.id)
        .firstOrFail()

      await account
        .merge({
          name: payload.name,
        })
        .save()
      return response.json(account)
    } catch (e) {
      return response.badRequest({ error: e.message })
    }
  }

  public async destroy({ params, response, auth }: HttpContextContract) {
    try {
      const account = await auth
        .user!.related('accounts')
        .query()
        .andWhere('accounts.id', params.id)
        .firstOrFail()
      await account.related('users').detach()
      await account.delete()
      return response.status(204)
    } catch (e) {
      return response.badRequest({ error: e.message })
    }
  }
}
