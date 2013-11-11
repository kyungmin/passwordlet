class BookmarkletController < ApplicationController
  
  def show
    render :show, :formats => :js
  end 

  def signed_in
    if user_signed_in?
      render :json => {"message" => "signed in"}, :callback => params['callback']
    else
      render :json => {"message" => "not signed in"}, :callback => params['callback']
    end
  end

end