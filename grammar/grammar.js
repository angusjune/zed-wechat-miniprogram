/**
 * @file Tree-sitter grammar for WeChat Mini Program WXML
 * @author Angus Zhu <angus.is.online@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

const PREC = {
  CONDITIONAL: 1,
  LOGICAL_OR: 2,
  LOGICAL_AND: 3,
  EQUALITY: 4,
  RELATIONAL: 5,
  ADDITIVE: 6,
  MULTIPLICATIVE: 7,
  UNARY: 8,
  CALL: 9,
  MEMBER: 10,
};

module.exports = grammar({
  name: "wxml",

  extras: $ => [
    /\s/,
  ],

  externals: $ => [
    $.raw_text,
    $._scanner_error_sentinel,
  ],

  word: $ => $.identifier,

  supertypes: $ => [
    $.expression,
  ],

  rules: {
    document: $ => repeat($._node),

    _node: $ => choice(
      $.comment,
      $.inline_wxs_module,
      $.external_wxs_module,
      $.import_element,
      $.include_element,
      $.template_element,
      $.block_element,
      $.slot_element,
      $.element,
      $.self_closing_element,
      $.interpolation,
      $.entity,
      $.text,
    ),

    element: $ => seq(
      $.opening_tag,
      repeat($._node),
      $.closing_tag,
    ),

    opening_tag: $ => seq(
      "<",
      field("name", $.tag_name),
      repeat($.attribute),
      ">",
    ),

    closing_tag: $ => seq(
      "</",
      field("name", $.tag_name),
      ">",
    ),

    self_closing_element: $ => seq(
      "<",
      field("name", $.tag_name),
      repeat($.attribute),
      "/>",
    ),

    import_element: $ => prec(2, specialSelfClosingElement($, "import")),
    include_element: $ => prec(2, specialSelfClosingElement($, "include")),

    template_element: $ => prec(2, choice(
      specialPairedElement($, "template"),
      specialSelfClosingElement($, "template"),
    )),

    block_element: $ => prec(2, choice(
      specialPairedElement($, "block"),
      specialSelfClosingElement($, "block"),
    )),

    slot_element: $ => prec(2, choice(
      specialPairedElement($, "slot"),
      specialSelfClosingElement($, "slot"),
    )),

    inline_wxs_module: $ => prec(3, seq(
      "<",
      alias("wxs", $.tag_name),
      repeat($.attribute),
      ">",
      optional(field("body", $.raw_text)),
      "</",
      alias("wxs", $.tag_name),
      ">",
    )),

    external_wxs_module: $ => prec(3, specialSelfClosingElement($, "wxs")),

    tag_name: _ => /[A-Za-z_][A-Za-z0-9_.:-]*/,

    attribute: $ => seq(
      field("name", $.attribute_name),
      optional(seq(
        "=",
        field("value", $.attribute_value),
      )),
    ),

    attribute_name: _ => /[A-Za-z_:][A-Za-z0-9_.:-]*/,

    attribute_value: $ => choice(
      $.double_quoted_attribute_value,
      $.single_quoted_attribute_value,
      $.unquoted_attribute_value,
    ),

    double_quoted_attribute_value: $ => seq(
      '"',
      repeat(choice(
        $.interpolation,
        $.entity,
        $.double_quoted_attribute_text,
      )),
      '"',
    ),

    double_quoted_attribute_text: _ => choice(
      token.immediate(prec(-1, /[^"{&]+/)),
      "{",
    ),

    single_quoted_attribute_value: $ => seq(
      "'",
      repeat(choice(
        $.interpolation,
        $.entity,
        $.single_quoted_attribute_text,
      )),
      "'",
    ),

    single_quoted_attribute_text: _ => choice(
      token.immediate(prec(-1, /[^'{&]+/)),
      "{",
    ),

    unquoted_attribute_value: $ => repeat1(choice(
      $.interpolation,
      $.entity,
      token(prec(-1, /[^\s<>{}"'=]+/)),
      "{",
    )),

    interpolation: $ => seq(
      "{{",
      field("body", choice(
        $.object_combination,
        $.expression,
      )),
      "}}",
    ),

    expression: $ => choice(
      $.identifier,
      $.boolean,
      $.number,
      $.string,
      $.array,
      $.parenthesized_expression,
      $.member_expression,
      $.subscript_expression,
      $.call_expression,
      $.unary_expression,
      $.binary_expression,
      $.conditional_expression,
    ),

    parenthesized_expression: $ => seq(
      "(",
      $.expression,
      ")",
    ),

    array: $ => seq(
      "[",
      optional(seq(
        $.expression,
        repeat(seq(",", $.expression)),
        optional(","),
      )),
      "]",
    ),

    member_expression: $ => prec.left(PREC.MEMBER, seq(
      field("object", $.expression),
      ".",
      field("property", $.identifier),
    )),

    subscript_expression: $ => prec.left(PREC.MEMBER, seq(
      field("object", $.expression),
      "[",
      field("index", $.expression),
      "]",
    )),

    call_expression: $ => prec.left(PREC.CALL, seq(
      field("function", $.expression),
      field("arguments", $.arguments),
    )),

    arguments: $ => seq(
      "(",
      optional(seq(
        $.expression,
        repeat(seq(",", $.expression)),
        optional(","),
      )),
      ")",
    ),

    unary_expression: $ => prec.right(PREC.UNARY, seq(
      field("operator", choice("!", "+", "-")),
      field("argument", $.expression),
    )),

    binary_expression: $ => choice(
      binaryExpression($, choice("*", "/", "%"), PREC.MULTIPLICATIVE),
      binaryExpression($, choice("+", "-"), PREC.ADDITIVE),
      binaryExpression($, choice("<", "<=", ">", ">="), PREC.RELATIONAL),
      binaryExpression($, choice("==", "!="), PREC.EQUALITY),
      binaryExpression($, "&&", PREC.LOGICAL_AND),
      binaryExpression($, "||", PREC.LOGICAL_OR),
    ),

    conditional_expression: $ => prec.right(PREC.CONDITIONAL, seq(
      field("condition", $.expression),
      "?",
      field("consequence", $.expression),
      ":",
      field("alternative", $.expression),
    )),

    object_combination: $ => choice(
      seq(
        field("entry", choice($.pair_entry, $.spread_entry)),
        repeat(seq(",", field("entry", $.combination_entry))),
        optional(","),
      ),
      seq(
        field("entry", $.shorthand_entry),
        repeat1(seq(",", field("entry", $.combination_entry))),
        optional(","),
      ),
    ),

    combination_entry: $ => choice(
      $.pair_entry,
      $.shorthand_entry,
      $.spread_entry,
    ),

    pair_entry: $ => seq(
      field("key", $.identifier),
      ":",
      field("value", $.expression),
    ),

    shorthand_entry: $ => field("name", $.identifier),

    spread_entry: $ => seq(
      "...",
      field("value", $.expression),
    ),

    identifier: _ => /[A-Za-z_$][A-Za-z0-9_$]*/,

    boolean: _ => choice("true", "false"),

    number: _ => token(choice(
      /0[xX][0-9a-fA-F]+/,
      /[0-9]+(\.[0-9]+)?([eE][+-]?[0-9]+)?/,
    )),

    string: $ => choice(
      seq(
        '"',
        repeat(choice(
          $.escape_sequence,
          token.immediate(/[^"\\\n]+/),
        )),
        '"',
      ),
      seq(
        "'",
        repeat(choice(
          $.escape_sequence,
          token.immediate(/[^'\\\n]+/),
        )),
        "'",
      ),
    ),

    escape_sequence: _ => token.immediate(seq("\\", /./)),

    entity: _ => token(/&([A-Za-z][A-Za-z0-9]+|#[0-9]+|#[xX][0-9a-fA-F]+);/),

    comment: _ => token(seq(
      "<!--",
      /[^-]*-+([^->][^-]*-+)*/,
      ">",
    )),

    text: _ => choice(
      token(prec(-1, /[^<{&\s][^<{&]*/)),
      "{",
    ),
  },
});

function binaryExpression($, operator, precedence) {
  return prec.left(precedence, seq(
    field("left", $.expression),
    field("operator", operator),
    field("right", $.expression),
  ));
}

function specialPairedElement($, name) {
  return seq(
    "<",
    alias(name, $.tag_name),
    repeat($.attribute),
    ">",
    repeat($._node),
    "</",
    alias(name, $.tag_name),
    ">",
  );
}

function specialSelfClosingElement($, name) {
  return seq(
    "<",
    alias(name, $.tag_name),
    repeat($.attribute),
    "/>",
  );
}
