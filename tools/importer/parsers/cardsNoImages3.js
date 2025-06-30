/* global WebImporter */
export default function parse(element, { document }) {
  // The table header as in the example
  const rows = [['Cards']];
  // Get all immediate card divs
  const cards = element.querySelectorAll(':scope > div');

  cards.forEach(cardElem => {
    // Find the card's textual content, ignoring the icon/div
    // Typical structure: <div><div class="icon">...</div></div><p>...</p>
    // So, find the first <p> child
    let cellContent = null;
    const p = cardElem.querySelector('p');
    if (p) {
      cellContent = p;
    } else {
      // Edge case: fallback to plain text content if no <p> is present
      // Extract all element nodes that are not .icon SVG wrappers
      const nonIconEls = Array.from(cardElem.children).filter(
        child => !(child.classList && child.classList.contains('icon'))
      );
      if (nonIconEls.length > 0) {
        cellContent = nonIconEls;
      } else {
        // Last fallback: use the full cardElem text
        cellContent = cardElem.textContent.trim();
      }
    }
    rows.push([cellContent]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
