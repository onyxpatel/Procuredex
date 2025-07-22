window.onload = function () {
  const results = document.getElementById('results');

  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'card';

    const keyword = encodeURIComponent(product.name);
    const searchURL = `https://www.target.com/s?searchTerm=${product.upc}`;
    const fallbackURL = `https://www.target.com/s?searchTerm=${keyword}`;

    card.innerHTML = `
      <h2>${product.name}</h2>
      <p>UPC: ${product.upc}</p>
      <p id="status-${product.upc}">Checking Target…</p>
    `;
    results.appendChild(card);

    const statusEl = document.getElementById(`status-${product.upc}`);
    const testImg = new Image();

    testImg.onload = () => {
      statusEl.innerHTML = `<a href="${searchURL}" target="_blank" class="status available">Available ✅ (UPC)</a>`;
    };
    testImg.onerror = () => {
      // If UPC search fails, show fallback link
      statusEl.innerHTML = `<a href="${fallbackURL}" target="_blank" class="status available">Try search for product name</a>`;
    };

    testImg.src = `https://www.target.com/favicon.ico`;
  });
};
