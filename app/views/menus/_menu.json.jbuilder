json.extract! menu, :id, :name, :price, :day, :image_url, :created_at, :updated_at
json.url menu_url(menu, format: :json)
