# WeChat Mini Program for Zed

Syntax highlighting for native WeChat Mini Program source files in Zed:

- WXML (`.wxml`), parsed by the original Tree-sitter grammar in this repository.
- WXSS (`.wxss`), parsed with Zed's built-in CSS grammar and WXSS-specific language queries.
- WXS (`.wxs`), parsed approximately with Zed's built-in TSX grammar and WXS-specific language queries.

The extension intentionally focuses on file recognition, highlighting, comments, and bracket matching. It does not provide completion, diagnostics, formatting, snippets, or a language server.

## Install as a development extension

1. Clone this repository.
2. In Zed, open the command palette and run `zed: install dev extension`.
3. Select the repository root (the directory containing `extension.toml`).
4. Open the files under `fixtures/` and confirm that Zed selects WXML, WXSS, and WXS respectively.

The committed manifest pins the owned WXML grammar to the first repository commit. That commit must exist on the repository remote before another machine can build the extension from the HTTPS grammar URL.

## Develop the WXML grammar

The grammar uses a repository-local, exactly pinned Tree-sitter CLI:

```sh
npm --prefix grammar ci
npm --prefix grammar run generate
npm --prefix grammar test
```

Zed compiles the checked-in `grammar/src/parser.c` and `grammar/src/scanner.c`; it does not run `tree-sitter generate`. Regenerate and commit those files whenever `grammar/grammar.js` changes.

For unpublished local grammar changes, temporarily replace the grammar repository in `extension.toml` with a `file://` Git repository containing the grammar commit. Restore the public HTTPS URL before publishing.

## Release sequence

Because the extension and grammar share a repository, grammar updates use two commits:

1. Commit the grammar source, generated parser, and corpus tests.
2. Update `extension.toml` to pin that commit SHA, then commit the extension change.

Push both commits before asking another Zed installation to build the extension.

## Known limitations

- WXS is a distinct language from JavaScript, but v0.1 uses Zed's TSX parser for pragmatic highlighting. It does not validate WXS semantics or reject unsupported JavaScript syntax.
- WXSS uses Zed's CSS parser. It highlights documented WXSS syntax such as `rpx` and `@import`, but does not validate the platform's supported CSS subset.
- The WXML parser accepts generic opening and closing tag names without checking that they match. This preserves highlighting during incomplete edits but is not structural validation.
- An inline WXS body ends at the first literal `</wxs>`, including when that text occurs inside a WXS string or comment.
- Only current, officially documented WeChat Mini Program syntax is targeted. Framework dialects are out of scope.
- The existing WXML-only extension in Zed's registry may require maintainer coordination before this broader extension can be published.

## License

MIT
