import React, { useState, useEffect } from 'react';
import Product from "../../inovice/Product";
import Popup from "../../inovice/Popup";
import ReactDOM from 'react-dom';

const Main = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', qty: 1, rate: 10 },
  ]);

  const [grandTotal, setGrandTotal] = useState(0);
  const [grandGst, setGrandGst] = useState(0);

  const addProduct = () => {
    setProducts([...products, { id: products.length + 1, name: '', qty: 0, rate: 0 }]);
  };

  const updateProduct = (id, updatedProduct) => {
    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, ...updatedProduct } : product
    );
    setProducts(updatedProducts);
  };

  const removeProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  };

  const togglePopup = () => {
    const popupWindow = window.open('', '_parent');

    if (popupWindow) {
      const popupContent = (
        <Popup
          products={products}
          grandTotal={grandTotal}
          grandGst={grandGst}
        />
      );

      ReactDOM.render(popupContent, popupWindow.document.body);
    }
  };

  useEffect(() => {
    const calculatedGrandTotal = products.reduce((acc, product) => acc + product.qty * product.rate, 0);
    setGrandTotal(calculatedGrandTotal);

    const calculatedGrandGst = products.reduce((acc, product) => acc + product.qty * product.rate * 0.18, 0);
    setGrandGst(calculatedGrandGst);
  }, [products]);

  return (
    <>
      <div className="bg-green-500">
        <nav className="bg-teal-500 p-4 flex items-center justify-between">
          <h1 className="text-white text-lg ml-4">Invoice Generator</h1>
          <button
            className="bg-white border-none outline-none p-2 rounded-full font-bold text-sm cursor-pointer mr-4"
            onClick={handleLogout}
          >
            Logout
          </button>
        </nav>
      </div>
      <div className="container mx-auto p-4 flex flex-col">
        <div className="flex-grow">
          <h1 className="text-2xl font-bold mb-4">Product Page</h1>
          {products.map((product) => (
            <Product
              key={product.id}
              id={product.id}
              name={product.name}
              qty={product.qty}
              rate={product.rate}
              onUpdate={updateProduct}
              onRemove={() => removeProduct(product.id)}
            />
          ))}
        </div>
        <div className="flex flex-col items-end mt-4">
          <button className="bg-blue-500 text-white p-2 mb-2 rounded-md sm:static sm:mr-2" onClick={addProduct}>
            Add Product
          </button>
          <div>
            <p className="mb-5 text-xl font-bold mr-40">Total: {grandTotal}</p>
            <p className="mb-5 text-xl font-bold">GST (18%): {grandGst}</p>
            <p className="text-2xl font-bold">Grand Total: {grandTotal + grandGst}</p>
          </div>
          <button className="bg-green-500 text-white p-2 mb-4  mt-4 rounded-md" onClick={togglePopup}>
            Click Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Main;
