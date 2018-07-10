class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.string :name
      t.binary :data
      t.string :filename
      t.string :mime_type
			t.string :url
<<<<<<< HEAD

=======
			
>>>>>>> master
      t.timestamps null: false
    end
  end
end
