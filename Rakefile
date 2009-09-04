task :environment do
  require 'rubygems'
  require 'activerecord'
  
  ActiveRecord::Base.establish_connection({
    :adapter => "sqlite3",
    :database => "db/grid_assets.sqlite3"
  })
end

namespace :db do
  desc "Migrate the database"
  task(:migrate => :environment) do
    ActiveRecord::Base.logger = Logger.new(STDOUT)
    ActiveRecord::Migration.verbose = true
    ActiveRecord::Migrator.migrate("db/migrate")
  end
  
  desc "Seed the database"
  task(:seed => :environment) do
    $:<< File.dirname(__FILE__) + '/vendor/paperclip/lib'
    $:<< File.dirname(__FILE__) + '/lib'
    require 'paperclip'
    require 'asset'
    require 'mutable_file'
    ActiveRecord::Base.logger = Logger.new(STDOUT)
    RAILS_ROOT = File.dirname(__FILE__)
    
    #Asset.destroy_all
    puts Asset.all.inspect
    
    Dir["/Users/david/Dropbox/Library/Desktops/*.jpg"].each do |file|
      puts "Importing #{file}..."
      file  = File.new(file)
      asset = Asset.create!({:asset => file})
    end
    
    
  end
  
end