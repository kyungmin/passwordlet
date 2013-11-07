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
    @domain = Domain.find_by_url(params[:domain])
    if @domain
      @cookies = @domain.get_cookies(@domain.url, @domain.username, @domain.password)
      render :json => @cookies.to_json
    else
      render :text => "can't find the domain", :status => :unprocessable_entity
    end
#    response.headers['Access-Control-Allow-Origin'] = "*"
    # @cookies.each do |cookie|
    #   response.headers["Set-Cookie"] = cookie[1]["name"] + "=" + cookie[1]["value"] + "; Domain=" + cookie[1]["domain"] + "; Expires=" + cookie[1]["expires"] + "; Path=" + cookie[1]["path"] + ";"
    # end
#    redirect_to @domain.url
  end

  def create
    @domain = Domain.new(params[:domain])
    @domain.url = URI.parse(params[:domain][:url]).host
    @domain.user_id = current_user.id
    
    if @domain.save
      flash[:notice] = "Successfully added #{@domain.name}."
      redirect_to root_url
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
