window.onload = function () {
  const results = document.getElementById('results');

  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'card';

    const targetURL = `https://www.target.com/s?searchTerm=${product.upc}`;

    card.innerHTML = `
      <h2>${product.name}</h2>
      <p>UPC: ${product.upc}</p>
      <p id="status-${product.upc}">Checking Target...</p>
    `;
    results.appendChild(card);

    const statusEl = document.getElementById(`status-${product.upc}`);

    const testImg = new Image();
    testImg.onload = () => {
      statusEl.innerHTML = `<a href="${targetURL}" target="_blank" class="status available">Available ✅</a>`;
    };
    testImg.onerror = () => {
      statusEl.innerHTML = `<span class="status unavailable">Unavailable ❌</span>`;
    };

    testImg.src = `https://www.target.com/favicon.ico`;
  });
};
