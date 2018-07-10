require "open-uri"

class Photo < ActiveRecord::Base
	attr_reader :avatar_remote_url
  has_attached_file :avatar

  def self.avatar_remote_url=(url_value)
    self.avatar = URI.parse(url_value)
    # Assuming url_value is http://example.com/photos/face.png
    # avatar_file_name == "face.png"
    # avatar_content_type == "image/png"
    @avatar_remote_url = url_value
  end
	
end
