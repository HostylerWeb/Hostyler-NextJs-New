import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { escapeHtml, escapeHtmlMultiline } from "../../src/lib/html";

describe("escapeHtml", () => {
  it("escapes HTML special characters", () => {
    assert.equal(
      escapeHtml(`<script>alert("xss")</script>`),
      "&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;",
    );
  });

  it("escapes multiline text with line breaks", () => {
    assert.equal(escapeHtmlMultiline("line1\nline2"), "line1<br/>line2");
  });
});
