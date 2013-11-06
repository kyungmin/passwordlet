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

    page.forms.each do |form|
      if form.field_with(:type => "password")
        if form.field_with(:type => "text")
          form.field_with(:type => "text").value = username
        else
          form.field_with(:type => "email").value = username
        end
        form.field_with(:type => "password").value = password
        form.submit
      end
    end  


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