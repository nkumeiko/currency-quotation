Rails.application.routes.draw do
  root to: 'application#show'

  get 'currency_quotes/:currency', to: 'currency_quotes#show'
end
