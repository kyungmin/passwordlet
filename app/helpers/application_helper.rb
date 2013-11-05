module ApplicationHelper
  def login_user(uri, username, password) # => works with twitter for now
    agent = Mechanize.new
    page = agent.get(uri)
    form = page.forms.first

    username_field = form.field_with(:name => "username")
    password_field = form.field_with(:name => "password")

    username_field.value = username
    password_field.value = password
    form.submit

    page = agent.get(uri)

    agent.cookies.each do |cookie|
      cookie_str = "document.cookie = \""
      cookie_str += cookie.name + "=" + cookie.value + '; '
      cookie_str += "expires=" + cookie.expires.to_s + '; '
      cookie_str += "path=" + cookie.path.to_s
      cookie_str += "\";"
      puts cookie_str
    end
  end
end
