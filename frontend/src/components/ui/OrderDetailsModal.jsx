import { Modal } from 'react-bootstrap';

export default function OrderDetailsModal({ order, onClose, onComplete }) {
  const subtotal = order.subtotal || 0;
  const tax = order.tax || 0;
  const total = order.total || 0;

  return (
    <Modal show onHide={onClose} centered size="lg">
      <div className="bg-white rounded-4 overflow-hidden">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center px-4 py-3 border-bottom">
          <h2 className="fs-4 fw-semibold m-0">Order Details</h2>

          <button onClick={onClose} className="btn btn-light rounded-circle">
            ✕
          </button>
        </div>

        <div
          className="p-4"
          style={{
            maxHeight: '70vh',
            overflowY: 'auto',
          }}
        >
          {/* Top Info */}
          <div className="row g-4 pb-4 border-bottom">
            <div className="col-6">
              <p className="text-secondary small mb-1">Order Number</p>

              <p className="fw-bold fs-5 mb-0">{order.orderNumber}</p>
            </div>

            <div className="col-6">
              <p className="text-secondary small mb-1">Status</p>

              <span
                className={`badge rounded-pill px-3 py-2
                ${
                  order.status === 'completed'
                    ? 'bg-success-subtle text-success'
                    : 'bg-warning-subtle text-warning'
                }`}
              >
                {order.status}
              </span>
            </div>

            <div className="col-6">
              <p className="text-secondary small mb-1">Date & Time</p>

              <p className="fw-medium m-0">{new Date(order.createdAt).toLocaleString()}</p>
            </div>

            <div className="col-6">
              <p className="text-secondary small mb-1">Customer</p>

              <p className="fw-medium m-0">{order.customerName}</p>
            </div>

            <div className="col-6">
              <p className="text-secondary small mb-1">Payment Method</p>

              <p className="fw-medium text-capitalize m-0">{order.paymentMethod}</p>
            </div>

            <div className="col-6">
              <p className="text-secondary small mb-1">Total Items</p>

              <p className="fw-medium m-0">{order.items.length}</p>
            </div>
          </div>

          {/* Items */}
          <div className="mt-4">
            <h5 className="fw-semibold mb-3">Order Items</h5>

            <div className="d-flex flex-column gap-3">
              {order.items.map((item) => (
                <div
                  key={item._id}
                  className="d-flex justify-content-between align-items-center p-3 bg-light rounded-3"
                >
                  <div>
                    <p className="fw-medium mb-1">{item.nameSnapshot}</p>

                    <small className="text-secondary">${item.priceSnapshot} each</small>
                  </div>

                  <div className="text-end">
                    <small className="text-secondary">Qty: {item.quantity}</small>

                    <p className="fw-medium mb-0">${item.subtotal}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="mt-4 pt-4 border-top">
            <div className="d-flex justify-content-between small mb-2">
              <span className="text-secondary">Subtotal</span>

              <span className="fw-medium">${subtotal}</span>
            </div>

            <div className="d-flex justify-content-between small mb-3">
              <span className="text-secondary">Tax</span>

              <span className="fw-medium">${tax}</span>
            </div>

            <div className="d-flex justify-content-between border-top pt-3">
              <span className="fw-bold fs-5">Total</span>

              <span className="fw-bold fs-4 text-warning">${total}</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="d-flex gap-3 pt-4">
            <button onClick={onClose} className="btn btn-light border w-100 py-3 rounded-4">
              Close
            </button>

            <button
              onClick={() => onComplete(order._id)}
              disabled={order.status === 'completed'}
              className="btn btn-success w-100 py-3 rounded-4 fw-semibold"
            >
              {order.status === 'completed' ? 'Completed' : 'Mark Completed'}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
