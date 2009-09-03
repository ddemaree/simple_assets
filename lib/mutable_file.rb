module MutableFile
  def self.included(base)
    base.send(:include, InstanceMethods)
    base.send(:alias_method_chain, :content_type, :override)
  end
  module InstanceMethods
    def original_filename=(name)
      @original_filename=name
    end
    def original_filename
      @original_filename || File.basename(self.path)
    end
    def content_type_with_override
      @content_type || content_type_without_override
    end
    def content_type=(type)
      @content_type = type
    end
  end
end

File.send(:include, MutableFile)