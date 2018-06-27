class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
			t.string :type
			t.string :name
			t.float :price
			t.string :description
			
			t.timestamps
    end
  end
end
