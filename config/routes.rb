Passwordlet::Application.routes.draw do
  root :to => "homes#index"
  
  devise_for :users
  
  resources :domains do
    collection do
      get "login"
    end    
  end
end
