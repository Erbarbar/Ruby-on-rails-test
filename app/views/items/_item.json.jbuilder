json.extract! item, :id, :type, :nome, :price, :desctiption, :created_at, :updated_at
json.url item_url(item, format: :json)
