class Asset < ActiveRecord::Base
  
  has_attached_file :asset, 
    :styles => { :large => "640x640>", :medium => "330x330>", :small => "180x180", :thumb => "100x100>" },
    :url => "/:class/:id/:filename_:style" #,
    #:storage => :filesystem,
    #:s3_credentials => "#{APP_ROOT}/config/amazon_s3.yml"
  
  validates_attachment_presence :asset
  
  # def to_json
  #   {
  #     :id => id,
  #     :file_name => asset_file_name,
  #     :content_type => asset_content_type
  #   }.to_json
  # end
  
  def to_json(*args)
    {
      :id => self.id,
      :file_name => self.asset_file_name,
      :timestamp => self.created_at,
      :url => {
        :thumb  => asset.url(:thumb, false),
        :small  => asset.url(:small, false),
        :medium => asset.url(:medium, false)
      }
    }.to_json
  end
  
end