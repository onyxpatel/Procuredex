window.onload = function () {
  const list = document.getElementById('product-list');
  
  if (!products.length) {
    list.innerHTML = "<p>No products available at the moment.</p>";
    return;
  }

  products.forEach(p => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <h2>${p.name}</h2>
      <p><strong>UPC:</strong> ${p.upc}</p>
      <p><strong>MSRP:</strong> ${p.msrp}</p>
      <p><strong>Release Date:</strong> ${p.release_date}</p>
      <p><strong>Retailers:</strong></p>
      <ul>
        ${Object.entries(p.retailers).map(([name, url]) => 
          `<li><a href="${url}" target="_blank" rel="noopener">${name}</a></li>`).join('')}
      </ul>
    `;
    list.appendChild(div);
  });
};
