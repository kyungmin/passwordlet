Passwordlet::Application.routes.draw do
  root :to => "homes#index"
  
  devise_for :users
  
  get "bookmarklet" => "bookmarklet#show"

  resources :domains do
    collection do
      get "login"
    end    
  end
end
