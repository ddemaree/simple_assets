class Asset < ActiveRecord::Base
  
  has_attached_file :asset, 
    :styles => { :large => "640x640>", :medium => "330x330>", :small => "180x180", :thumb => "100x100>" },
    :url => "/:class/:id/:filename_:style" #,
    #:storage => :filesystem,
    #:s3_credentials => "#{APP_ROOT}/config/amazon_s3.yml"
  
  validates_attachment_presence :asset
  
end