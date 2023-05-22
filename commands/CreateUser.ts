import { BaseCommand } from '@adonisjs/core/build/standalone'

export default class CreateUser extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'create:user'

  /**
   * Command description is displayed in the "help" output
   */
  public static description = 'Create user'

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command. Don't forget to call `node ace generate:manifest`
     * afterwards.
     */
    loadApp: true,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process. Don't forget to call
     * `node ace generate:manifest` afterwards.
     */
    stayAlive: false,
  }

  public async run() {
    const { default: User } = await import('App/Models/User')
    const email = await this.prompt.ask('Enter email')
    const password = await this.prompt.secure('Choose account password')

    try {
      await User.create({
        email: email,
        password: password,
      })
    } catch (error) {
      this.logger.error(error.message)
    }
    this.logger.info('User created successfully')
  }
}
