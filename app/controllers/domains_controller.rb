class DomainsController < ApplicationController
  def index
    if user_signed_in?
      @domains = Domain.where(:user_id => current_user.id)
    end
    render :json => @domains
  end

  def new
    @domain = Domain.new
    render :new  
  end

  def create
    @domain = Domain.new(params[:domain])
    @domain.domain_url = URI.parse(params[:domain][:domain_url]).to_s
    @domain.user_id = current_user.id
    
    if @domain.save
      render :json => @domain
    else
      render :json => @domain.errors.full_messages
    end    
  end

  def login
    @domain = Domain.where('user_id = ? AND domain_url LIKE ?', current_user.id, '%' + params[:domain] + '%').first

    if @domain
      @cookies = @domain.get_cookies(@domain.domain_url, @domain.domain_username, @domain.password)
      render :json => @cookies.to_json, :callback => params['callback']
    else
      render :json => {"message" => "domain not found"}, :callback => params['callback']
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
    render :json => { "message" => "domain deleted" }
  end
end
