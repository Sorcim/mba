import { schema, CustomMessages, validator } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateAccountValidator {
  constructor(protected ctx: HttpContextContract) {}
  public reporter = validator.reporters.api
  public schema = schema.create({
    name: schema.string(),
    start_balance: schema.number(),
  })
  public messages: CustomMessages = {}
}
