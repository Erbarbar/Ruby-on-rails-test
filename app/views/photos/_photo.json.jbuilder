json.extract! photo, :id, :name, :data, :filename, :mime_type, :created_at, :updated_at
json.url photo_url(photo, format: :json)
