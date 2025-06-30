/* global WebImporter */
export default function parse(element, { document }) {
  // Gather immediate child divs (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, use the image inside if present, otherwise the div itself
  const columnCells = columns.map((colDiv) => {
    const img = colDiv.querySelector('img');
    return img || colDiv;
  });

  // Create the table using the helper, then set colspan on the header
  const tableRows = [
    ['Columns (columns2)'],
    columnCells
  ];
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Fix the header cell to span all columns
  const headerRow = table.querySelector('tr');
  const headerCell = headerRow && headerRow.querySelector('th');
  if (headerCell && columnCells.length > 1) {
    headerCell.setAttribute('colspan', columnCells.length);
  }

  element.replaceWith(table);
}
