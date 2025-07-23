import { useEffect, useState } from 'react';

type Product = {
  id: string;
  name: string;
  store: string;
  inStock: boolean;
  url: string;
};

const mockProducts: Product[] = [
  { id: '1', name: 'Charizard EX Premium Collection', store: 'Pokémon Center', inStock: false, url: 'https://www.pokemoncenter.com/' },
  { id: '2', name: 'Scarlet & Violet Booster Box', store: 'Walmart', inStock: true, url: 'https://www.walmart.com/' },
  { id: '3', name: 'Paldean Fates Elite Trainer Box', store: 'Target', inStock: false, url: 'https://www.target.com/' },
  { id: '4', name: 'Pokémon Card Tins', store: 'GameStop', inStock: true, url: 'https://www.gamestop.com/' },
  { id: '5', name: 'Eevee Plush', store: 'Best Buy', inStock: true, url: 'https://www.bestbuy.com/' },
  { id: '6', name: 'Collector’s Guidebook', store: 'Barnes & Noble', inStock: false, url: 'https://www.barnesandnoble.com/' },
];

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setTimeout(() => setProducts(mockProducts), 500);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-4">
      <header className="text-3xl font-bold mb-6 text-center">Procurédex</header>
      <main className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {products.map((p) => (
          <div key={p.id} className={\`p-4 border rounded shadow-sm hover:shadow-md transition bg-white \${p.inStock ? 'border-green-400' : 'border-red-300 opacity-60'}\`}>
            <h2 className="text-xl font-semibold">{p.name}</h2>
            <p className="text-sm text-gray-600">{p.store}</p>
            <p className={\`mt-2 font-bold \${p.inStock ? 'text-green-600' : 'text-red-500'}\`}>
              {p.inStock ? 'In Stock' : 'Out of Stock'}
            </p>
            <a href={p.url} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-blue-500 hover:underline">
              Visit Store
            </a>
          </div>
        ))}
      </main>
    </div>
  );
}
