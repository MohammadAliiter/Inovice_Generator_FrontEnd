
import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import axios from 'axios';

const Popup = ({ products, grandTotal, grandGst }) => {
  const GTotal = grandTotal + grandGst;
  const pdfRef = useRef();
  const downloadPDF = () => {
    const input = pdfRef.current;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4', true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      const detailedData = {
        products: products.map((product) => ({
          id: product.id,
          name: product.name,
          qty: product.qty,
          rate: product.rate,
          total: product.qty * product.rate,
        })),
        grandTotal: GTotal,
        grandGst: grandGst,
      };
    
      axios
        .post('https://inovice-generator-backend.onrender.com/api/invoice', detailedData)
        .then((response) => {
          console.log('Data sent successfully:', response.data);
        })
        .catch((error) => {
          console.error('Error sending data:', error.response ? error.response.data : error.message);
        });
        

      pdf.save('invoice.pdf');
    });
  };

  return (
    
        <>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg" ref={pdfRef}>
        <div className="popup-content">
          <h2 className="text-2xl font-bold mb-4 mt-2 sm:ml-4">Product Details</h2>

          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 sm:ml-4 sm:mr-4">
            <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800 border-b border-b-2 font-bold">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 border-b border-b-2 font-bold">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800 border-b border-b-2 font-bold">
                  Rate
                </th>
                <th scope="col" className="px-6 py-3 border-b border-b-2 font-bold">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr className="bg-white dark:bg-gray-800" key={product.id}>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {product.name}
                  </th>
                  <td className="px-6 py-4">{product.qty}</td>
                  <td className="px-6 py-4">{product.rate}</td>
                  <td className="px-6 py-4">{product.qty * product.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>

      <hr className="my-4 ml-4 sm:ml-4 w-full border-b border-gray-300 dark:border-gray-700" />
      <div className="container mx-auto sm:ml-4">
            <div className="sm:relative text-center mt-20">
          <div className="relative text-center mt-20">
            <p className="mb-8">
              <span className="text-xl">Total:</span>
              <span className="ml-8 text-xl">{grandTotal}</span>
            </p>
            <p className="mb-5">
              <span className=" text-xl">GST:</span>
              <span className="ml-8 text-xl">18%</span>
            </p>
            <hr className="w-80 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-4 dark:bg-gray-700" />
            <p className="text-2xl font-bold mt-4 ">
              <span className="">Grand Total:</span>
              <span className="ml-4">{GTotal}</span>
            </p>
            <hr className="w-80 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-4 dark:bg-gray-700" />
          </div>
        </div>
      </div>
     
      </div>
      </div>
      <div className="text-center mt-5 sm:mt-0">
                <button
                  className="bg-green-500 text-white p-2 mb-4 rounded-md sm:inline-block sm:mx-2"
                  onClick={downloadPDF}
                >
                  Download PDF
                </button>
              </div>
    </>
  );
};

export default Popup;