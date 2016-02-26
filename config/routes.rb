Rails.application.routes.draw do
  root to: "static_pages#root"
  resources :users, only: [:new, :show, :create]
  resources :session, only: [:new, :create, :destroy]

  namespace :api do
    resources :goals, only: [:index, :update, :create, :update, :show, :destroy]
  end
end
