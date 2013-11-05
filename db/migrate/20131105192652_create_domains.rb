class CreateDomains < ActiveRecord::Migration
  def change
    create_table :domains do |t|
      t.string :name, :null => false
      t.string :url, :null => false
      t.string :username, :null => false
      t.string :encrypted_password, :null => false
      t.integer :user_id, :null => false 
      t.timestamps
    end

    add_index :domains, :user_id
  end
end
