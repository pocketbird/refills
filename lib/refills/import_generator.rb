require 'rails/generators'

module Refills
  class ImportGenerator < Rails::Generators::Base
    desc 'Copy refills'
    source_root File.expand_path("../../../source", __FILE__)
    argument :snippet, type: :string, required: true

    def copy_html
      copy_file partial_name, File.join('app', 'views', 'refills', partial_name)
    end

    def copy_styles
      copy_file(
        File.join('stylesheets', 'refills', stylesheet_name),
        File.join('app', 'assets', 'stylesheets', 'refills', stylesheet_name)
      )
    end

    def copy_javascripts
      copy_file(
        File.join('javascripts', 'refills', javascript_name),
        File.join('app', 'assets', 'javascript', 'refills', javascript_name)
      )
    end

    private

    def partial_name
      "_#{snippet.underscore}.html.erb"
    end

    def stylesheet_name
      "_#{snippet.dasherize}.scss"
    end

    def javascript_name
      "#{snippet.underscore}.js"
    end
  end
end
