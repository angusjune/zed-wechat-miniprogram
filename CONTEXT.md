# WeChat Mini Program Language Support

Vocabulary for describing the source languages recognized by this Zed extension.

## Language

**WeChat Mini Program**:
An application built for the WeChat Mini Program platform using its native source languages.
_Avoid_: WeChat mini-program, WeChat applet

**WXML**:
The markup language that defines a WeChat Mini Program page or component structure, including data bindings and platform directives.
_Avoid_: HTML, XML

**WXSS**:
The stylesheet language used to present WXML documents, based on CSS with WeChat-specific capabilities and constraints.
_Avoid_: CSS

**WXS**:
The scripting language used from WXML for view-layer expressions and modules; it is distinct from JavaScript despite their syntactic overlap.
_Avoid_: JavaScript

**WXML expression**:
An expression delimited by `{{` and `}}` inside WXML text or an attribute value, including WXML-specific object-combination syntax.
_Avoid_: JavaScript expression, WXS expression

**WXML object combination**:
A WXML expression form that combines named, shorthand, or spread entries without surrounding object braces.
_Avoid_: JavaScript object literal

**Inline WXS module**:
A WXS module whose source appears inside a WXML `wxs` element rather than in a separate WXS file.
_Avoid_: Inline JavaScript
