# Pre-load housekeeping code goes here, so as not to 
# clutter the main controller file

# Define APP_ROOT constant, and alias to RAILS_ROOT so
# ActiveRecord and Paperclip stay happy
APP_ROOT   = File.dirname(__FILE__) + "/.."
RAILS_ROOT = APP_ROOT

# Add local lib to load path
$:<< "#{APP_ROOT}/lib"

# Add vendor libs to load path
Dir["#{APP_ROOT}/vendor/*/lib"].each do |dir|
  puts "Adding #{dir} to load path..."
  $:<< dir
end

# We love gems
require 'activesupport'
require 'activerecord'
require 'paperclip'
require 'haml'

# We love our models
require 'asset'
require 'mutable_file'

# We love SQLite
ActiveRecord::Base.establish_connection({
  :adapter => "sqlite3",
  :database => "db/grid_assets.sqlite3"
})

# We love it when paperclip doesn't whine about
# not having a logger
ActiveRecord::Base.logger = Logger.new(STDOUT)