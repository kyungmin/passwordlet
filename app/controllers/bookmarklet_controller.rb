class BookmarkletController < ApplicationController
  
  def show
    render :show, :formats => :js
  end 

end