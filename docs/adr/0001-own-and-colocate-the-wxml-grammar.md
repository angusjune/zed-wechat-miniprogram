# Own and colocate the WXML grammar

We will author an original Tree-sitter grammar for WXML from the official WeChat Mini Program documentation and our corpus tests instead of depending on or copying a community grammar. Its source will live in this repository under `grammar/`; published manifests will pin an earlier pushed commit of this repository with `path = "grammar"`, while local grammar work may use a `file://` repository. Keeping the source out of `grammars/wxml/` avoids Zed's reserved grammar checkout path. WXSS and WXS will reuse Zed's built-in `css` and `tsx` grammars without registering additional grammar dependencies.

## Consequences

WXML parser behavior and maintenance remain under this project's control, but releases that change the grammar require two commits: one containing the generated parser and a later commit pinning that revision in `extension.toml`.
