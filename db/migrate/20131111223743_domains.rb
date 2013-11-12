class Domains < ActiveRecord::Migration
  def change
    create_table :domains do |t|
      t.string :name, :null => false
      t.text :domain_url, :null => false
      t.string :domain_username, :null => false
      t.text :domain_password, :null => false
      t.integer :user_id, :null => false 
      t.timestamps
    end

    add_index :domains, :user_id
  end
end
