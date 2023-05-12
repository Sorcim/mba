import { schema, CustomMessages, validator } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateTransactionValidator {
  constructor(protected ctx: HttpContextContract) {}
  public reporter = validator.reporters.api
  public schema = schema.create({
    description: schema.string(),
    amount: schema.number(),
    date: schema.date(),
  })
  public messages: CustomMessages = {}
}
