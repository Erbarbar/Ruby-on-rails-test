json.extract! arcticle, :id, :title, :description, :created_at, :updated_at
json.url arcticle_url(arcticle, format: :json)
