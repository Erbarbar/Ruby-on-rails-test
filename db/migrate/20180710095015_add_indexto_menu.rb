class AddIndextoMenu < ActiveRecord::Migration
  def change
		add_index :menus, [:name, :price, :day], unique: true
  end
end
