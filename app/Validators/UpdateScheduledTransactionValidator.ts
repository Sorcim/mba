import { schema, CustomMessages, validator } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateScheduledTransactionValidator {
  constructor(protected ctx: HttpContextContract) {}
  public reporter = validator.reporters.api
  public schema = schema.create({
    description: schema.string.optional(),
    amount: schema.number.optional(),
    day: schema.number.optional(),
    end_date: schema.date.optional({
      format: 'yyyy-MM-dd HH:mm:ss',
    }),
  })
  public messages: CustomMessages = {}
}
