require 'rubygems'
require 'sinatra'

require 'config/boot'

put "/assets/:id" do |id|
  "UPDATE ASSET NUMBER #{id}"
end

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

get "/assets/:id" do |id|
  @asset = Asset.find(id)
  content_type "application/json"
  @asset.to_json
end

get "/assets" do
  @assets = Asset.all
  @assets.to_json
end

get "/" do
  @assets = Asset.all
  haml :main_index
end