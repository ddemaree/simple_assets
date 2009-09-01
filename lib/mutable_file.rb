module MutableFile
  def self.included(base)
    base.send(:include, InstanceMethods)
  end
  module InstanceMethods
    def original_filename=(name)
      @original_filename=name
    end
    def original_filename
      @original_filename || File.basename(self.path)
    end
  end
end

File.send(:include, MutableFile)