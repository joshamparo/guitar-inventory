import React, { useState } from 'react';

// Guitar Form Component with validation and guitar-themed UI styling
export default function GuitarForm({ onAddItem }) {
  // Local state for input fields
  const [formData, setFormData] = useState({
    model: '',
    bodyType: 'Electric',
    brand: '',
    stock: '',  
    manufacturer: '',
    userRole: 'Merchant'
  });

  // Local state for tracking validation error messages
  const [errors, setErrors] = useState({});

  // Inline Validation Function[cite: 1]
  const validateForm = () => {
    let newErrors = {};

    // Validate Model: minimum 3 characters[cite: 1]
    if (!formData.model.trim()) {
      newErrors.model = 'Guitar model is required.';
    } else if (formData.model.trim().length < 3) {
      newErrors.model = 'Model must be at least 3 characters.';
    }

    // Validate Brand Name[cite: 1]
    if (!formData.brand.trim()) {
      newErrors.brand = 'Brand name is required.';
    }

    // Validate Manufacturer Name[cite: 1]
    if (!formData.manufacturer.trim()) {
      newErrors.manufacturer = 'Manufacturer name is required.';
    }

    // Validate Stock Quantity: number between 1 and 100[cite: 1]
    const stockNumber = Number(formData.stock);
    if (!formData.stock) {
      newErrors.stock = 'Stock quantity is required.';
    } else if (isNaN(stockNumber) || stockNumber < 1 || stockNumber > 100) {
      newErrors.stock = 'Stock must be between 1 and 100.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onAddItem({
        id: Date.now(),
        model: formData.model.trim(),
        bodyType: formData.bodyType,
        brand: formData.brand.trim(),
        stock: Number(formData.stock),
        manufacturer: formData.manufacturer.trim(),
        userRole: formData.userRole
      });

      // Clear input fields
      setFormData({
        model: '',
        bodyType: 'Electric',
        brand: '',
        stock: '',
        manufacturer: '',
        userRole: 'Merchant'
      });
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl space-y-4 text-slate-100">
      <div className="flex items-center space-x-2 border-b border-slate-700 pb-3">
        <span className="text-2xl">🎸</span>
        <h2 className="text-lg font-bold tracking-wide uppercase text-amber-500">Register Guitar Item</h2>
      </div>

      {/* Model Input */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Guitar Model</label>
        <input
          type="text"
          value={formData.model}
          onChange={(e) => setFormData({ ...formData, model: e.target.value })}
          placeholder="e.g. Stratocaster, Les Paul, GS Mini"
          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-100 placeholder-slate-500 focus:border-amber-500 focus:outline-none"
        />
        {errors.model && <p className="text-amber-400 text-xs mt-1">{errors.model}</p>}
      </div>

      {/* Body Type & Brand Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Body Type</label>
          <select
            value={formData.bodyType}
            onChange={(e) => setFormData({ ...formData, bodyType: e.target.value })}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-100 focus:border-amber-500 focus:outline-none"
          >
            <option value="Electric">Electric ⚡</option>
            <option value="Acoustic">Acoustic 🪵</option>
            <option value="Bass">Bass 🔊</option>
            <option value="Classical">Classical 🎼</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Brand Name</label>
          <input
            type="text"
            value={formData.brand}
            onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
            placeholder="e.g. Fender, Gibson, Ibanez"
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-100 placeholder-slate-500 focus:border-amber-500 focus:outline-none"
          />
          {errors.brand && <p className="text-amber-400 text-xs mt-1">{errors.brand}</p>}
        </div>
      </div>

      {/* Stock & Manufacturer Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Stock Qty (1-100)</label>
          <input
            type="number"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            placeholder="1-100"
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-100 placeholder-slate-500 focus:border-amber-500 focus:outline-none"
          />
          {errors.stock && <p className="text-amber-400 text-xs mt-1">{errors.stock}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Manufacturer</label>
          <input
            type="text"
            value={formData.manufacturer}
            onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
            placeholder="e.g. FMIC, Gibson Brands"
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-100 placeholder-slate-500 focus:border-amber-500 focus:outline-none"
          />
          {errors.manufacturer && <p className="text-amber-400 text-xs mt-1">{errors.manufacturer}</p>}
        </div>
      </div>

      {/* User Role Radio Options */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">User Role</label>
        <div className="flex gap-6">
          <label className="inline-flex items-center cursor-pointer text-sm">
            <input
              type="radio"
              name="userRole"
              value="Merchant"
              checked={formData.userRole === 'Merchant'}
              onChange={(e) => setFormData({ ...formData, userRole: e.target.value })}
              className="accent-amber-500"
            />
            <span className="ml-2 text-slate-300">Merchant</span>
          </label>
          <label className="inline-flex items-center cursor-pointer text-sm">
            <input
              type="radio"
              name="userRole"
              value="Consumer"
              checked={formData.userRole === 'Consumer'}
              onChange={(e) => setFormData({ ...formData, userRole: e.target.value })}
              className="accent-amber-500"
            />
            <span className="ml-2 text-slate-300">Consumer</span>
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2.5 rounded-lg transition duration-200 uppercase tracking-wider text-sm shadow-md"
      >
        Add to Guitar Registry
      </button>
    </form>
  );
}