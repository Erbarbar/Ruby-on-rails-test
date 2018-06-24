class CreateDiscursos < ActiveRecord::Migration
  def change
    create_table :discursos do |t|
      t.date :data
      t.text :sescricao
      t.integer :duracao

      t.timestamps null: false
    end
  end
end
