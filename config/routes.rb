Passwordlet::Application.routes.draw do
  root :to => "domains#index"
  
  devise_for :users
  
  resources :domains do
    member do
      get "login"
    end    
  end
end
