Rails.application.routes.draw do
  root to: "static_pages#root"
  resource :session, only: [:new, :create, :destroy]

  get 'guest', :to => 'sessions#guest'


  namespace :api do
    resources :ownerships, only: [:index, :create, :destroy]
    resources :items, only: [:index, :show], defaults: {format: :json}
    resources :users, only: [:new, :index, :create, :update, :show]
    resources :goals, only: [:index, :update, :create, :update, :show, :destroy]
  end
end
