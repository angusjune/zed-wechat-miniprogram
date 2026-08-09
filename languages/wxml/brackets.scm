(opening_tag
  "<" @open
  ">" @close)

(closing_tag
  "</" @open
  ">" @close)

(self_closing_element
  "<" @open
  "/>" @close)

[
  (import_element "<" @open "/>" @close)
  (include_element "<" @open "/>" @close)
  (template_element "<" @open "/>" @close)
  (block_element "<" @open "/>" @close)
  (slot_element "<" @open "/>" @close)
  (external_wxs_module "<" @open "/>" @close)
]

[
  (template_element "<" @open ">" @close)
  (block_element "<" @open ">" @close)
  (slot_element "<" @open ">" @close)
  (inline_wxs_module "<" @open ">" @close)
]

[
  (template_element "</" @open ">" @close)
  (block_element "</" @open ">" @close)
  (slot_element "</" @open ">" @close)
  (inline_wxs_module "</" @open ">" @close)
]

(interpolation
  "{{" @open
  "}}" @close)

(arguments
  "(" @open
  ")" @close)

(parenthesized_expression
  "(" @open
  ")" @close)

(array
  "[" @open
  "]" @close)

(subscript_expression
  "[" @open
  "]" @close)

(double_quoted_attribute_value
  "\"" @open
  "\"" @close)

(single_quoted_attribute_value
  "'" @open
  "'" @close)
