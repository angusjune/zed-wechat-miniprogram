#include "tree_sitter/parser.h"

#include <stdbool.h>
#include <stdint.h>

enum TokenType {
  RAW_TEXT,
  ERROR_SENTINEL,
};

void *tree_sitter_wxml_external_scanner_create(void) { return NULL; }

void tree_sitter_wxml_external_scanner_destroy(void *payload) {
  (void)payload;
}

unsigned tree_sitter_wxml_external_scanner_serialize(void *payload,
                                                     char *buffer) {
  (void)payload;
  (void)buffer;
  return 0;
}

void tree_sitter_wxml_external_scanner_deserialize(void *payload,
                                                   const char *buffer,
                                                   unsigned length) {
  (void)payload;
  (void)buffer;
  (void)length;
}

static bool scan_closing_wxs(TSLexer *lexer) {
  const char suffix[] = {'/', 'w', 'x', 's', '>'};

  if (lexer->lookahead != '<') {
    return false;
  }

  lexer->advance(lexer, false);
  for (unsigned i = 0; i < sizeof(suffix); i++) {
    if (lexer->lookahead != suffix[i]) {
      return false;
    }
    lexer->advance(lexer, false);
  }

  return true;
}

bool tree_sitter_wxml_external_scanner_scan(void *payload, TSLexer *lexer,
                                            const bool *valid_symbols) {
  (void)payload;

  if (valid_symbols[ERROR_SENTINEL] || !valid_symbols[RAW_TEXT]) {
    return false;
  }

  bool has_content = false;
  lexer->mark_end(lexer);

  while (!lexer->eof(lexer)) {
    if (lexer->lookahead == '<') {
      lexer->mark_end(lexer);
      if (scan_closing_wxs(lexer)) {
        if (!has_content) {
          return false;
        }
        lexer->result_symbol = RAW_TEXT;
        return true;
      }
      has_content = true;
      continue;
    }

    has_content = true;
    lexer->advance(lexer, false);
  }

  if (!has_content) {
    return false;
  }

  lexer->mark_end(lexer);
  lexer->result_symbol = RAW_TEXT;
  return true;
}
