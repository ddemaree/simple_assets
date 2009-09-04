# Simple assets. Seriously.

This is a simple(!) asset manager I'm building for a seekrit blogging project. The idea is for it to provide an utterly minimal web-based GUI, as well as a lightweight JSON web service, for uploading and resizing images, then getting the S3 URLs.

It uses the following bits of Ruby goodness:

* Rack
* [Rails](http://www.rubyonrails.org/)'s ActiveSupport and ActiveRecord frameworks 
* [Sinatra](http://sinatrarb.com/)
* [Paperclip](http://github.com/thoughtbot/paperclip)
* Amazon S3
* Prototype
* JSON
* CSS and HTML optimized for WebKit, complete with CSS3 goodness and WebKit-specific _super-goodness_

Right now it saves to the filesystem. Eventually it will save to S3.

It works for me. Maybe it will work for you.