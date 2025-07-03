import React from 'react';

const BillReceipt = ({ order }) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto print:shadow-none print:max-w-none">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">UrbanThreads</h1>
        <p className="text-gray-600">Fashion for the Modern World</p>
        <div className="border-b-2 border-gray-200 mt-4"></div>
      </div>

      {/* Bill Details */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">INVOICE / RECEIPT</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p><span className="font-medium">Invoice #:</span> {order._id.slice(-8).toUpperCase()}</p>
            <p><span className="font-medium">Date:</span> {new Date(order.createdAt).toLocaleDateString()}</p>
            <p><span className="font-medium">Payment Method:</span> {order.paymentMethod.replace('-', ' ').toUpperCase()}</p>
          </div>
          <div>
            <p><span className="font-medium">Status:</span> {order.isPaid ? 'PAID' : 'PENDING'}</p>
            <p><span className="font-medium">Order Date:</span> {new Date(order.createdAt).toLocaleDateString()}</p>
            {order.paidAt && (
              <p><span className="font-medium">Payment Date:</span> {new Date(order.paidAt).toLocaleDateString()}</p>
            )}
          </div>
        </div>
      </div>

      {/* Customer Information */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-2">Bill To:</h3>
        <div className="text-sm text-gray-700">
          <p className="font-medium">{order.user?.name}</p>
          <p>{order.user?.email}</p>
          <div className="mt-2">
            <p>{order.shippingAddress.address}</p>
            <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
            <p>{order.shippingAddress.country}</p>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="mb-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-2 text-sm font-medium text-gray-900">Item</th>
              <th className="text-center py-2 text-sm font-medium text-gray-900">Qty</th>
              <th className="text-right py-2 text-sm font-medium text-gray-900">Unit Price</th>
              <th className="text-right py-2 text-sm font-medium text-gray-900">Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className="py-3 text-sm">
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-gray-600 text-xs">
                      Size: {item.size} | Color: {item.color}
                    </p>
                  </div>
                </td>
                <td className="py-3 text-center text-sm text-gray-700">{item.quantity}</td>
                <td className="py-3 text-right text-sm text-gray-700">${item.price.toFixed(2)}</td>
                <td className="py-3 text-right text-sm font-medium text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="mb-6">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal:</span>
            <span className="text-gray-900">${order.itemsPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tax:</span>
            <span className="text-gray-900">${order.taxPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping:</span>
            <span className="text-gray-900">
              {order.shippingPrice === 0 ? 'FREE' : `$${order.shippingPrice.toFixed(2)}`}
            </span>
          </div>
          <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-lg">
            <span className="text-gray-900">Total:</span>
            <span className="text-gray-900">${order.totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Payment Status */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Payment Status:</span>
          <span className={`text-sm font-medium ${order.isPaid ? 'text-green-600' : 'text-yellow-600'}`}>
            {order.isPaid ? '✓ PAID' : '⏳ PENDING'}
          </span>
        </div>
        {order.isPaid && order.paidAt && (
          <p className="text-xs text-gray-500 mt-1">
            Paid on {new Date(order.paidAt).toLocaleDateString()} at {new Date(order.paidAt).toLocaleTimeString()}
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-gray-500 border-t border-gray-200 pt-4">
        <p>Thank you for shopping with UrbanThreads!</p>
        <p>For support, contact us at support@urbanthreads.com</p>
        <p className="mt-2">This is a digitally generated receipt.</p>
      </div>

      {/* Print Button */}
      <div className="text-center mt-6 print:hidden">
        <button
          onClick={handlePrint}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Download Receipt
        </button>
      </div>
    </div>
  );
};

export default BillReceipt;
