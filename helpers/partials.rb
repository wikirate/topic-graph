module Partials
  def section color, second_color=nil, py="py-5", &block
    color = [color, second_color].compact.join('-')
    partial "partials/section", locals: { color: "#{color}-bg", py: py }, &block
  end
end