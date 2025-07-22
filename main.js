window.onload = function () {
  const list = document.getElementById('product-list');

  if (!products.length) {
    list.innerHTML = "<p>No products available at the moment.</p>";
    return;
  }

  products.forEach((p) => {
    const div = document.createElement('div');
    div.className = 'card';

    const isPinned = p.pinned === true;

    div.innerHTML = `
      <h2>${isPinned ? '🔧 ' : ''}${p.name}</h2>
      ${isPinned ? '<p><em>This is a system check product.</em></p>' : ''}
      <p><strong>UPC:</strong> ${p.upc}</p>
      <p><strong>MSRP:</strong> ${p.msrp}</p>
      <p><strong>Release Date:</strong> ${p.release_date}</p>
      <p><strong>Retailers:</strong></p>
      <ul id="retailers-${p.upc}"></ul>
    `;

    list.appendChild(div);

    const retailerList = document.getElementById(`retailers-${p.upc}`);

    Object.entries(p.retailers).forEach(([name, url]) => {
      const li = document.createElement('li');
      retailerList.appendChild(li);

      const testImg = new Image();

      // Use domain-level favicon as availability test
      const domain = new URL(url).hostname;
      testImg.onload = () => {
        li.innerHTML = `<a href="${url}" target="_blank" rel="noopener">${name}</a>`;
      };
      testImg.onerror = () => {
        li.innerHTML = `<span>${name} – <em>Unavailable</em></span>`;
      };

      testImg.src = `https://${domain}/favicon.ico`;
    });
  });
};
