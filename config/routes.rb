Passwordlet::Application.routes.draw do
  root :to => "homes#index"
  
  devise_for :users
  
  resources :domains do
    member do
      get "login"
    end    
  end
end
