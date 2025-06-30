/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the block table rows
  const rows = [['Accordion']]; // Header row with the block name

  // Find all direct children accordion blocks
  const accordions = Array.from(element.querySelectorAll(':scope > .accordion'));
  accordions.forEach((accordion) => {
    // Title cell: find the .w-dropdown-toggle, then the .paragraph-lg inside
    const toggle = accordion.querySelector('.w-dropdown-toggle');
    let titleElem = null;
    if (toggle) {
      // Prefer the .paragraph-lg as the title
      const para = toggle.querySelector('.paragraph-lg');
      if (para) {
        titleElem = para;
      } else {
        // Fallback: use the toggle itself if .paragraph-lg is missing
        titleElem = toggle;
      }
    }

    // Content cell: get the .accordion-content (nav)
    let contentElem = null;
    const nav = accordion.querySelector('.accordion-content');
    if (nav) {
      // Use the container that holds the content for resilience (includes rich-text)
      contentElem = nav;
    }

    // Only add rows if both title and content exist
    if (titleElem && contentElem) {
      rows.push([titleElem, contentElem]);
    }
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the new block table
  element.replaceWith(table);
}
