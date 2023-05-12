import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.group(() => {
      Route.post('/login', 'AuthController.login')
      Route.get('/logout', 'AuthController.logout')
    }).prefix('/auth')
    Route.group(() => {
      Route.resource('account', 'AccountsController').apiOnly()
      Route.resource('account.transaction', 'TransactionsController').apiOnly()
      Route.resource('account.scheduled_transaction', 'ScheduledTransactionsController').apiOnly()
    }).middleware('auth')
  }).prefix('/v1')
}).prefix('/api')
