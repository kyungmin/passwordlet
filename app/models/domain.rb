require 'openssl'

class Domain < ActiveRecord::Base
  attr_reader :password
  attr_accessible :name, :domain_url, :domain_username, :password, :user_id
  validates :name, :domain_url, :domain_username, :domain_password, :user_id, :presence => true
  
  belongs_to :user

  def password=(password)
    @password = password
    self.domain_password = encrypt(password)
  end

  def password
    decrypt(self.domain_password)
  end

  def get_cookies(url, username, password)
    agent = Mechanize.new
    agent.user_agent_alias = 'Mac Safari'
    agent.follow_meta_refresh = true

    unless url[/\Ahttp:\/\//] || self.domain_url[/\Ahttps:\/\//]
      url = "http://#{url}"
    end

    page = agent.get(url)

    page.forms.each do |form|
      if form.field_with(:type => "password")
        if form.field_with(:type => "text")
          form.field_with(:type => "text").value = username
        else
          form.field_with(:type => "email").value = username
        end
        form.field_with(:type => "password").value = password
        binding.pry
        form.submit
      end
    end

    cookies = {}
    agent.cookies.each do |cookie|
      c = {}
      c["name"] = cookie.name
      c["value"] = cookie.value
      c["domain"] = cookie.domain
      c["secure"] = cookie.secure
      c["expires"] = cookie.expires.to_s
      c["path"] = cookie.path.to_s
      cookies[cookie.name] = c
    end

    cookies
  end

  private

  def encrypt(plain_data)
    cipher = OpenSSL::Cipher::Cipher.new('aes-256-cbc')
    cipher.encrypt
    cipher.key = ENV["AES_KEY"]
    cipher.iv = ENV["IV"]
    encrypted = cipher.update(plain_data)
    encrypted << cipher.final
    Base64.encode64(encrypted).encode('utf-8')
  end

  def decrypt(encrypted_data)
    cipher = OpenSSL::Cipher::Cipher.new('aes-256-cbc')
    cipher.decrypt
    cipher.key = ENV["AES_KEY"]
    cipher.iv = ENV["IV"]
    decoded_data = Base64.decode64(encrypted_data.encode('ascii-8bit'))
    decrypted = cipher.update(decoded_data)
    decrypted << cipher.final
  end

end