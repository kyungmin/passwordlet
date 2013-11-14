Passwordlet::Application.routes.draw do
  root :to => "homes#index"
  
  devise_for :users
  
  get "bookmarklet" => "bookmarklet#show"
  get "bookmarklet/signed_in" => "bookmarklet#signed_in"

  resources :domains do
    collection do
      get "login"
    end    
  end
end
