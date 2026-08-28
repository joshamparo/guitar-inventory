import React, { useState, useEffect } from 'react';
import GuitarForm from './components/GuitarForm';
import GuitarTable from './components/GuitarTable';

const INITIAL_GUITARS = [
  { id: 1, model: 'Stratocaster Player II', bodyType: 'Electric', brand: 'Fender', stock: 12, manufacturer: 'FMIC', userRole: 'Merchant' },
  { id: 2, model: 'Les Paul Standard 60s', bodyType: 'Electric', brand: 'Gibson', stock: 5, manufacturer: 'Gibson Brands', userRole: 'Consumer' },
  { id: 3, model: '214ce Deluxe', bodyType: 'Acoustic', brand: 'Taylor', stock: 8, manufacturer: 'Taylor Guitars', userRole: 'Merchant' }
];

export default function App() {
  const [items, setItems] = useState(INITIAL_GUITARS);
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeCard, setActiveCard] = useState(null);
  const [filterType, setFilterType] = useState('All');

  // PHASE 3: Synchronize row selection to Active Item Detail Card[cite: 1]
  useEffect(() => {
    if (selectedItem) {
      setActiveCard(selectedItem);
    }
  }, [selectedItem]);

  const handleAddItem = (newItem) => {
    setItems((prev) => [newItem, ...prev]);
    setSelectedItem(newItem);
  };

  const filteredItems = items.filter((item) => {
    if (filterType === 'All') return true;
    return item.bodyType === filterType;
  });

  return (
    <div className="min-h-screen bg-slate-900 p-6 md:p-12 text-slate-100">
      {/* Header */}
      <header className="max-w-6xl mx-auto mb-8 border-b border-slate-800 pb-4 flex justify-between items-end">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-3xl">🎸</span>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-100 uppercase">
              Guitar Store <span className="text-amber-500">& Inventory</span> Hub
            </h1>
          </div>
          <p className="text-slate-400 text-xs font-mono mt-1">Midterm Exam — Set B (Guitar Inventory)</p>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Form */}
        <section className="lg:col-span-1">
          <GuitarForm onAddItem={handleAddItem} />
        </section>

        {/* Right Column: Table and Active Detail Sync */}
        <section className="lg:col-span-2 space-y-6">
          {/* Category Filter */}
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-md flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Filter Body Type:</span>
            <div className="flex gap-1.5 overflow-x-auto">
              {['All', 'Electric', 'Acoustic', 'Bass', 'Classical'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                    filterType === type
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* TanStack Table */}
          <GuitarTable
            data={filteredItems}
            onSelectRow={(item) => setSelectedItem(item)}
            selectedId={selectedItem?.id}
          />

          {/* Active Profile Card (Synced via useEffect)[cite: 1] */}
          {activeCard ? (
            <div className="bg-slate-800 p-6 rounded-xl border-l-4 border-amber-500 shadow-xl border-y border-r border-slate-700 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-mono uppercase text-amber-500 tracking-wider">Selected Guitar Specs</span>
                  <h3 className="text-2xl font-black text-slate-100">{activeCard.model}</h3>
                  <p className="text-sm text-slate-400">{activeCard.brand} — {activeCard.manufacturer}</p>
                </div>
                <span className={`px-3 py-1 text-xs font-extrabold rounded-full tracking-wider uppercase ${
                  activeCard.userRole === 'Merchant'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                }`}>
                  {activeCard.userRole}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-mono bg-slate-900/60 p-4 rounded-lg border border-slate-700/50">
                <div>
                  <span className="text-slate-500 block">BODY TYPE</span>
                  <span className="text-slate-200 font-bold text-sm">{activeCard.bodyType}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">STOCK QUANTITY</span>
                  <span className="text-slate-200 font-bold text-sm">{activeCard.stock} Units</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-800 text-center text-slate-500 text-xs font-mono">
              Click any row in the registry table above to inspect active guitar specs.
            </div>
          )}
        </section>
      </main>
    </div>
  );
}