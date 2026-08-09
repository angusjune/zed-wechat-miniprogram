(identifier) @variable
(property_identifier) @property
(shorthand_property_identifier) @property

(call_expression
  function: (identifier) @function)

(call_expression
  function: (member_expression
    property: (property_identifier) @function))

(function_expression
  name: (identifier) @function)

(function_declaration
  name: (identifier) @function)

(pair
  key: (property_identifier) @property)

(required_parameter
  (identifier) @variable.parameter)

((identifier) @constant.builtin
  (#eq? @constant.builtin "module"))

((identifier) @function
  (#any-of? @function "require" "getDate" "getRegExp"))

(this) @variable.special

[
  (null)
  (undefined)
] @constant.builtin

[
  (true)
  (false)
] @boolean

(comment) @comment

[
  (string)
  (template_string)
] @string

(escape_sequence) @string.escape
(number) @number

[
  "var"
  "function"
] @keyword.declaration

[
  "break"
  "case"
  "continue"
  "default"
  "do"
  "else"
  "for"
  "if"
  "return"
  "switch"
  "throw"
  "try"
  "catch"
  "finally"
  "while"
] @keyword.control

[
  "new"
  "delete"
  "typeof"
  "void"
  "instanceof"
  "in"
] @keyword

[
  "-"
  "--"
  "-="
  "+"
  "++"
  "+="
  "*"
  "*="
  "/"
  "/="
  "%"
  "%="
  "<"
  "<="
  "="
  "=="
  "!"
  "!="
  ">"
  ">="
  "~"
  "^"
  "&"
  "|"
  "&&"
  "||"
  "..."
] @operator

(ternary_expression
  [
    "?"
    ":"
  ] @operator)

[
  ";"
  "."
  ","
  ":"
] @punctuation.delimiter

[
  "("
  ")"
  "["
  "]"
  "{"
  "}"
] @punctuation.bracket
