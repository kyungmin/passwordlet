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
    if !user_signed_in?
      render :json => {"message" => "not signed in"}, :callback => params['callback']
    end

    response.headers['Access-Control-Allow-Origin'] = "*"

    @domain = Domain.find_by_url(params[:domain])
    
    if @domain
      @cookies = @domain.get_cookies(@domain.url, @domain.username, @domain.password)
      render :json => @cookies.to_json, :callback => params['callback']
    else
      render :json => {"message" => "domain not found"}, :callback => params['callback']
    end
  end

  def create
    @domain = Domain.new(params[:domain])
    @domain.url = URI.parse(params[:domain][:url]).host
    @domain.user_id = current_user.id
    
    if @domain.save
      flash[:notice] = "Successfully added #{@domain.name}."
      redirect_to root_url
    else
      flash[:alert] = @domain.errors.full_messages
      render :new
    end
    
  end

  def update
    @domain = Domain.find(params[:id])
    @domain.update_attributes(params[:domain])
    render :json => @domain
  end

  def destroy
    @domain = Domain.find(params[:id])
    @domain.destroy
    render :json => "deleted"
  end
end
