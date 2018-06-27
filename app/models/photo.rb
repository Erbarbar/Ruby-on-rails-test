require "open-uri"

class Photo < ActiveRecord::Base
	has_attached_file :image
	validates_attachment :image, content_type: { content_type: ["image/jpeg", "image/gif", "image/png"] }
	
	
	def picture_from_url=(url)
    self.picture = URI.parse(url).open
  end
	
end
