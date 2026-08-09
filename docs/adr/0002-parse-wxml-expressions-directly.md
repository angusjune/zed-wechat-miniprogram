# Parse WXML expressions directly

The owned WXML grammar will expose structured nodes for WXML expressions and object combinations instead of treating interpolation bodies as opaque JavaScript injections. It will use declarative grammar rules for expressions and a small stateless C scanner only to delimit the raw body of an inline WXS module. This makes WXML-specific syntax highlightable and keeps the syntax tree independent of JavaScript, at the cost of maintaining an expression grammar and its node contract locally.

## Consequences

Highlight queries and corpus tests may rely on the expression node names and fields as a stable interface. The parser will accept a conservative set of conventional expression operators for editing tolerance, but it will not attempt semantic validation or broad JavaScript compatibility.
