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
		puts "\nTesting graph\n\n"
		@graph = Koala::Facebook::API.new()
		puts ENV["MY_TOKEN"]
		
		puts @graph
	end
	
	def dsv01
		
	end
	
	def jonubaso
		
	end

end