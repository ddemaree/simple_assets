class CreateAssets < ActiveRecord::Migration
  
  def self.up
    create_table :assets, :force => true do |t|
      t.string :asset_file_name, :asset_content_type
      t.integer :asset_file_size
      t.datetime :asset_updated_at
      t.timestamps
    end
  end
  
  def self.down
    drop_table :assets
  end
  
end