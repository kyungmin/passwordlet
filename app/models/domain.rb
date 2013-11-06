class Domain < ActiveRecord::Base
  attr_reader :password
  attr_accessible :name, :url, :username, :password, :user_id
  validates :name, :url, :username, :password, :encrypted_password, :user_id, :presence => true
  belongs_to :user

  def password=(password)
    @password = password
    self.encrypted_password = password #BCrypt::Password.create(password)
  end

  def password
    self.encrypted_password
  end

  def get_cookies(url, username, password)
    agent = Mechanize.new
    page = agent.get(url) 
    form = page.forms.first

    username_field = form.field_with(:name => "username") # TODO: see if this works for other sites
    password_field = form.field_with(:name => "password")

    username_field.value = username
    password_field.value = password
    form.submit

    agent.get(url)

    cookies = {}
    agent.cookies.each do |cookie|
      c = {}
      c["name"] = cookie.name
      c["value"] = cookie.value
      c["expires"] = cookie.expires.to_s
      c["path"] = cookie.path.to_s
      cookies[cookie.name] = c
    end

    cookies
  end
end