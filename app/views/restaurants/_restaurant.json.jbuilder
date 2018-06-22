json.extract! restaurant, :id, :name, :description, :location, :created_at, :updated_at
json.url restaurant_url(restaurant, format: :json)
