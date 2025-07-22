window.onload = async function () {
  const results = document.getElementById('results');

  products.forEach(async (product) => {
    const card = document.createElement('div');
    card.className = 'card';

    const retailers = {
      Target: `https://www.target.com/s?searchTerm=${product.upc}`,
      BestBuy: `https://www.bestbuy.com/site/searchpage.jsp?st=${product.upc}`,
      GameStop: `https://www.gamestop.com/search/?q=${product.upc}`
    };

    card.innerHTML = `<h2>${product.name}</h2><p>UPC: ${product.upc}</p><ul id="r-${product.upc}"></ul>`;
    results.appendChild(card);

    const ul = document.getElementById(`r-${product.upc}`);

    Object.entries(retailers).forEach(([store, url]) => {
      const li = document.createElement('li');
      li.textContent = `${store}: Checking...`;
      ul.appendChild(li);

      const testImg = new Image();
      const domain = new URL(url).hostname;
      testImg.onload = () => {
        li.innerHTML = `${store}: <a href="${url}" target="_blank">Available ✅</a>`;
        li.className = 'status available';
      };
      testImg.onerror = () => {
        li.innerHTML = `${store}: Unavailable ❌`;
        li.className = 'status unavailable';
      };

      testImg.src = `https://${domain}/favicon.ico`;
    });
  });
};
