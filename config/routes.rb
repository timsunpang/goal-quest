Rails.application.routes.draw do
  root to: "static_pages#root"
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: {format: :json} do
    resources :ownerships, only: [:index, :create, :destroy]
    resources :items, only: [:index, :show]
    resources :users, only: [:new, :index, :create, :update, :show]
    resources :goals, only: [:index, :update, :create, :update, :show, :destroy]
  end
end
