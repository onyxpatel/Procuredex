window.onload = function () {
  const list = document.getElementById('product-list');

  if (!products.length) {
    list.innerHTML = "<p>No products available at the moment.</p>";
    return;
  }

  products.forEach((p) => {
    const div = document.createElement('div');
    div.className = 'card';

    div.innerHTML = `
      <h2>${p.name}</h2>
      <p><strong>UPC:</strong> ${p.upc}</p>
      <p><strong>MSRP:</strong> ${p.msrp}</p>
      <p><strong>Release Date:</strong> ${p.release_date}</p>
      <p><strong>Retailers:</strong></p>
      <ul id="retailers-${p.upc}"><li>Checking availability...</li></ul>
    `;

    list.appendChild(div);

    // After DOM renders, populate retailer links with fallback
    const retailerList = document.getElementById(`retailers-${p.upc}`);
    retailerList.innerHTML = ''; // clear loading text

    Object.entries(p.retailers).forEach(([name, url]) => {
      const li = document.createElement('li');

      // Use a workaround: create an invisible image to detect if the link resolves
      const testImg = new Image();
      testImg.onload = () => {
        li.innerHTML = `<a href="${url}" target="_blank" rel="noopener">${name}</a>`;
      };
      testImg.onerror = () => {
        li.innerHTML = `<span>${name} – <em>Unavailable</em></span>`;
      };

      // Load an image from the domain (will fail if dead link or invalid domain)
      testImg.src = `${url}/favicon.ico`;

      retailerList.appendChild(li);
    });
  });
};
