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
end