import React, { useState, useEffect } from 'react';

const Product = ({ id, name, qty, rate, onUpdate, onRemove }) => {
  const [total, setTotal] = useState(qty * rate);

  const handleUpdate = (field, value) => {
    onUpdate(id, { [field]: value });
  };

  useEffect(() => {
    const newTotal = qty * rate;
    const newGst = newTotal * 0.18;
    setTotal(newTotal);
    
  }, [qty, rate]);

  return (
    <div className="border p-4 mb-4 flex flex-col sm:flex-row items-center">
      <div className="flex-grow mb-2 sm:mb-0 sm:mr-2">
        <label className="block text-gray-700">
          <span className="mb-4 block">Name:</span>
          <input
            type="text"
            value={name}
            onChange={(e) => handleUpdate('name', e.target.value)}
            className="w-full max-w-lg rounded-lg border border-slate-400 px-2 py-1 hover:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500/40 active:ring active:ring-blue-500/40"
          />
        </label>
      </div>
      <div className="flex-grow mb-2 sm:mb-0 sm:mr-2">
        <label className="block text-gray-700">
          <span className="mb-4 block">Qty:</span>
          <input
            type="number"
            value={qty}
            onChange={(e) => handleUpdate('qty', parseInt(e.target.value, 10))}
            className="w-full max-w-lg rounded-lg border border-slate-400 px-2 py-1 hover:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500/40 active:ring active:ring-blue-500/40"
          />
        </label>
      </div>
      <div className="flex-grow mb-2 sm:mb-0 sm:mr-2">
        <label className="block text-gray-700">
          <span className="mb-4 block">Rate:</span>
          <input
            type="number"
            value={rate}
            onChange={(e) => handleUpdate('rate', parseInt(e.target.value, 10))}
            className="w-full max-w-lg rounded-lg border border-slate-400 px-2 py-1 hover:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500/40 active:ring active:ring-blue-500/40"
          />
        </label>
      </div>
      <div className="flex-grow mb-2 sm:mb-0 sm:mr-2">
        <label className="block text-gray-700">
          <span className="mb-4 block">Total:</span>
          <p className="text-gray-700"> INR: {total}</p>
        </label>
      </div>
      <div>
        <button className="bg-red-500 text-white p-2 mt-2 rounded-md" onClick={onRemove}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default Product;
