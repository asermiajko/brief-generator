export function markdownToHtml(md: string): string {
  return md
    // Headers
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    // Bold
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    // Italic
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    // Unordered lists
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/((?:<li>.*<\/li>\n?)+)/g, "<ul>$1</ul>")
    // Paragraphs (lines not starting with HTML tags)
    .replace(/^(?!<[hulo])(.*\S.*)$/gm, "<p>$1</p>")
    // Tables
    .replace(
      /\|(.+)\|\n\|[-| ]+\|\n((?:\|.+\|\n?)+)/g,
      (_: string, header: string, body: string) => {
        const ths = header
          .split("|")
          .filter((c: string) => c.trim())
          .map((c: string) => `<th>${c.trim()}</th>`)
          .join("");
        const rows = body
          .trim()
          .split("\n")
          .map((row: string) => {
            const tds = row
              .split("|")
              .filter((c: string) => c.trim())
              .map((c: string) => `<td>${c.trim()}</td>`)
              .join("");
            return `<tr>${tds}</tr>`;
          })
          .join("");
        return `<table><thead><tr>${ths}</tr></thead><tbody>${rows}</tbody></table>`;
      }
    );
}

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
