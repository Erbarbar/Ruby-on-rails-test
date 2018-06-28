require 'koala'

class PagesController < ActionController::Base
	def home
		
	end
	
	def test
		puts "Hello World!"
	end
	
	def button
		puts "button pressed"
		redirect_to root_path
	end
	
	def graph
		require 'koala'
		puts "\nTesting graph\n\n"
		
		
		@oauth = Koala::Facebook::OAuth.new(ENV["MY_APP_ID"], ENV["MY_APP_SECRET"], "https://erbarbar.herokuapp.com/graph2")
		
		@url = @oauth.url_for_oauth_code
		@app_tokenp_token =  @oauth.get_app_access_token
		@my_token = ENV["MY_TOKEN"]
		
		puts @url
		puts @app_token
		puts @my_token
		redirect_to @url
	end
	
	def graph2
		@code = params[:code]
		puts @code
		@tok = @oauth.url_for_access_token(@code)
		puts @tok
	end
	
	def dsv01
		
	end
	
	def jonubaso
		
	end

end