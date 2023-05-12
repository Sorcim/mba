import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async login({ request, response, auth }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      await auth.use('web').attempt(email, password)
      return response.json(auth.user!)
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }

  public async logout({ response, auth }: HttpContextContract) {
    try {
      await auth.use('web').logout()
      return response.status(200)
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }
}
