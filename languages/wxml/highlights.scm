(comment) @comment

(tag_name) @tag

((tag_name) @tag @keyword
  (#any-of? @keyword "wxs" "template" "import" "include" "block" "slot"))

(attribute_name) @attribute

((attribute_name) @attribute @keyword
  (#match? @keyword "^(wx:|bind:|catch:|capture-bind:|capture-catch:|bind[a-zA-Z]|catch[a-zA-Z]|mut-bind:)"))

[
  (double_quoted_attribute_value)
  (single_quoted_attribute_value)
  (unquoted_attribute_value)
] @string

(entity) @string.special
(text) @text.literal
(raw_text) @embedded

(identifier) @variable
(boolean) @boolean
(number) @number
(string) @string
(escape_sequence) @string.escape

(member_expression
  property: (identifier) @property)

(call_expression
  function: (identifier) @function)

(call_expression
  function: (member_expression
    property: (identifier) @function))

(pair_entry
  key: (identifier) @property)

(shorthand_entry
  name: (identifier) @property)

(interpolation
  [
    "{{"
    "}}"
  ] @punctuation.special)

(binary_expression
  operator: _ @operator)

(unary_expression
  operator: _ @operator)

(conditional_expression
  [
    "?"
    ":"
  ] @operator)

(spread_entry
  "..." @operator)

(member_expression
  "." @punctuation.delimiter)

(pair_entry
  ":" @punctuation.delimiter)

(object_combination
  "," @punctuation.delimiter)

(arguments
  [
    "("
    ")"
  ] @punctuation.bracket)

(parenthesized_expression
  [
    "("
    ")"
  ] @punctuation.bracket)

(array
  [
    "["
    "]"
  ] @punctuation.bracket)

(subscript_expression
  [
    "["
    "]"
  ] @punctuation.bracket)

(attribute
  "=" @punctuation.delimiter)

(opening_tag
  [
    "<"
    ">"
  ] @punctuation.bracket)

(closing_tag
  [
    "</"
    ">"
  ] @punctuation.bracket)

(self_closing_element
  [
    "<"
    "/>"
  ] @punctuation.bracket)

(import_element [
  "<"
  "/>"
] @punctuation.bracket)

(include_element [
  "<"
  "/>"
] @punctuation.bracket)

(template_element [
  "<"
  "</"
  ">"
  "/>"
] @punctuation.bracket)

(block_element [
  "<"
  "</"
  ">"
  "/>"
] @punctuation.bracket)

(slot_element [
  "<"
  "</"
  ">"
  "/>"
] @punctuation.bracket)

(inline_wxs_module [
  "<"
  "</"
  ">"
] @punctuation.bracket)

(external_wxs_module [
  "<"
  "/>"
] @punctuation.bracket)
