Koala.configure do |config|
  config.access_token = ENV["MY_TOKEN"]
  config.app_access_token = "MY_APP_ACCESS_TOKEN"
  config.app_id = ENV["MY_APP_ID"]
  config.app_secret = ENV["MY_APP_SECRET"]
end
