require 'rubygems'
require 'sinatra'

require 'activesupport'
require 'activerecord'
require 'paperclip'
require 'haml'

APP_ROOT   = File.dirname(__FILE__)
RAILS_ROOT = APP_ROOT

$:<< "#{APP_ROOT}/lib"
require 'asset'
require 'mutable_file'

ActiveRecord::Base.establish_connection({
  :adapter => "sqlite3",
  :database => "db/grid_assets.sqlite3"
})

ActiveRecord::Base.logger = Logger.new(STDOUT)


post "/assets" do
  file = params[:asset_file][:tempfile]
  file.original_filename = params[:asset_file][:filename]
  
  @asset = Asset.new(:asset => file)
  @asset.save!
  
  redirect "/"
end

get "/assets/new" do
  haml :new
end

get "/assets" do
  @assets = Asset.all
  haml :index
end

get "/" do
  redirect "/assets"
end