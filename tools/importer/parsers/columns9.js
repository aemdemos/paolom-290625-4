/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Collect the column elements (children of grid)
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // Construct table rows
  // The header row must be a single cell (one column) and span all columns
  // To achieve this, create a <th> with colspan = columns.length
  const table = document.createElement('table');
  const headerTr = document.createElement('tr');
  const th = document.createElement('th');
  th.textContent = 'Columns (columns9)';
  th.colSpan = columns.length; // Make header span all columns
  headerTr.appendChild(th);
  table.appendChild(headerTr);

  // Content row
  const contentTr = document.createElement('tr');
  columns.forEach((col) => {
    const td = document.createElement('td');
    td.appendChild(col);
    contentTr.appendChild(td);
  });
  table.appendChild(contentTr);

  element.replaceWith(table);
}
