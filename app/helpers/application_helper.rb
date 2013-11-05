module ApplicationHelper
  def login_user(uri, username, password)
    agent = Mechanize.new
    page = agent.get(uri)
    form = page.forms.first

    username_field = form.field_with(:name => "username") # TODO: see if this works for other sites
    password_field = form.field_with(:name => "password")

    username_field.value = username
    password_field.value = password
    form.submit

    agent.get(uri)

    cookie_arr = []
    agent.cookies.each do |cookie|
      cookie_str = "document.cookie = \""
      cookie_str += cookie.name + "=" + cookie.value + '; '
      cookie_str += "expires=" + cookie.expires.to_s + '; '
      cookie_str += "path=" + cookie.path.to_s
      cookie_str += "\";"
      cookie_arr << cookie_str
    end

    cookie_arr.join
  end
end
