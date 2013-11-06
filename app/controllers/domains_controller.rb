class DomainsController < ApplicationController
  def index
    @domains = Domain.where(:user_id => current_user.id)
    render :json => @domains
  end

  def new
    @domain = Domain.new
    render :new  
  end

  def login
    @domain = Domain.find(params[:id])
    @cookies = @domain.get_cookies(@domain.url, @domain.username, @domain.password)
    @cookies.to_json
    render :json => @cookies
  end

  def create
    @domain = Domain.new(params[:domain])
    @domain.user_id = current_user.id
    
    if @domain.save
      # flash[:notice] = "Successfully added #{@domain.name}."
      render :json => @domain
    else
      render :json => @domain.errors.full_messages, :status => :unprocessable_entity
    end
    
  end

  def update
    redirect_to root_url
  end

  def destroy
    redirect_to root_url
  end
end
