import { schema, validator } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateScheduledTransactionValidator {
  constructor(protected ctx: HttpContextContract) {}
  public reporter = validator.reporters.api
  public schema = schema.create({
    description: schema.string(),
    amount: schema.number(),
    day: schema.number(),
    end_date: schema.date(),
  })
}
