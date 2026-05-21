import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  FaMinus,
  FaPercent,
  FaPlus,
  FaRegClock,
  FaRegTrashAlt,
} from 'react-icons/fa';
import { toast } from 'react-toastify';

import { axiosInstance } from '../../api/axiosInstance';
import CustomModal from '../ui/CustomModal';
import styles from './Cart.module.css';

const checkoutSchema = z
  .object({
    customerName: z.string().min(1, 'Customer name is required'),
    paymentMethod: z.enum(['cash', 'card']),
    orderType: z.enum(['takeaway', 'dine-in', 'delivery']),
    tableNumber: z.string().optional(),
    phone: z.string().optional(),
    deliveryAddress: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.orderType === 'dine-in' && (!data.tableNumber || data.tableNumber.trim() === '')) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['tableNumber'],
        message: 'Table number is required for dine-in orders',
      });
    }
    if (data.orderType === 'delivery') {
      if (!data.phone || data.phone.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['phone'],
          message: 'Phone number is required for delivery',
        });
      }
      if (!data.deliveryAddress || data.deliveryAddress.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['deliveryAddress'],
          message: 'Delivery address is required for delivery',
        });
      }
    }
  });

const Cart = ({ cartItems, setCartItems }) => {
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      customerName: 'Walk-in Customer',
      paymentMethod: 'cash',
      orderType: 'takeaway',
      tableNumber: '',
      phone: '',
      deliveryAddress: '',
    },
  });

  const selectedOrderType = watch('orderType');

  // Clear hidden fields when orderType changes
  useEffect(() => {
    if (selectedOrderType === 'takeaway') {
      setValue('tableNumber', '');
      setValue('phone', '');
      setValue('deliveryAddress', '');
    } else if (selectedOrderType === 'dine-in') {
      setValue('phone', '');
      setValue('deliveryAddress', '');
    } else if (selectedOrderType === 'delivery') {
      setValue('tableNumber', '');
    }
  }, [selectedOrderType, setValue]);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const tax = subtotal * 0.08;

  const total = subtotal + tax;

  const handleCheckoutSubmit = async (data) => {
    try {
      const orderData = {
        ...data,
        cashierId: localStorage.getItem('userid'),

        items: cartItems.map((item) => ({
          productId: item.product._id,
          quantity: item.quantity,
        })),
      };

      const res = await axiosInstance.post('/order', orderData);

      console.log(res.data);
      toast.success('Order placed successfully!');

      setCartItems([]);
      setShowCheckoutModal(false);
      reset();
    } catch (error) {
      console.log(error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Failed to place order');
    }
  };

  const handlePlaceOrderClick = () => {
    if (cartItems.length === 0) return;
    setShowCheckoutModal(true);
  };

  return (
    <div className={styles.cart}>
      {/* Header */}
      <div className={styles.header}>
        <h4 className="mb-0">Current Order</h4>

        <button className={styles.clearBtn}>Clear All</button>
      </div>

      {/* Cart Items */}
      <div className="overflow-auto h-100">
        <div className={`${styles.cartBody}`}>
          {cartItems.map((item) => (
            <div className={styles.cartCard} key={item.product._id}>
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h6 className={styles.title}>{item.product.name}</h6>

                  <p className={styles.price}>${item.product.price} each</p>
                </div>

                <FaRegTrashAlt className={styles.deleteIcon} />
              </div>

              <div className="d-flex justify-content-between align-items-center mt-3">
                <div className={styles.quantityBox}>
                  <button className={styles.qtyBtn}>
                    <FaMinus />
                  </button>

                  <span className={styles.qtyText}>{item.quantity}</span>

                  <button className={styles.qtyBtn}>
                    <FaPlus />
                  </button>
                </div>

                <span className={styles.itemTotal}>
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <div className="d-flex gap-2 mb-3">
          <button className={styles.actionBtn}>
            <FaPercent />
            Discount
          </button>

          <button className={styles.actionBtn}>
            <FaRegClock />
            Hold
          </button>
        </div>

        <div className={styles.summaryRow}>
          <span>Subtotal</span>

          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className={styles.summaryRow}>
          <span>Tax (8%)</span>

          <span>${tax.toFixed(2)}</span>
        </div>

        <hr />

        <div className={styles.totalRow}>
          <span>Total</span>

          <span>${total.toFixed(2)}</span>
        </div>

        <button onClick={handlePlaceOrderClick} className={styles.orderBtn} disabled={cartItems.length === 0}>
          Place Order
        </button>
      </div>

      {/* Checkout Modal */}
      <CustomModal
        show={showCheckoutModal}
        onClose={() => {
          setShowCheckoutModal(false);
          reset();
        }}
        title="Complete Order"
        formId="checkout-form"
        saveText="Confirm Order"
      >
        <form id="checkout-form" onSubmit={handleSubmit(handleCheckoutSubmit)}>
          <div className="mb-3">
            <label className="form-label fw-bold">Customer Name</label>
            <input
              type="text"
              className={`form-control ${errors.customerName ? 'is-invalid' : ''}`}
              {...register('customerName')}
              placeholder="e.g. Walk-in Customer"
            />
            {errors.customerName && (
              <div className="invalid-feedback">{errors.customerName.message}</div>
            )}
          </div>
          
          <div className="mb-3">
            <label className="form-label fw-bold">Payment Method</label>
            <select
              className={`form-select ${errors.paymentMethod ? 'is-invalid' : ''}`}
              {...register('paymentMethod')}
            >
              <option value="cash">Cash</option>
              <option value="card">Card</option>
            </select>
            {errors.paymentMethod && (
              <div className="invalid-feedback">{errors.paymentMethod.message}</div>
            )}
          </div>
          
          <div className="mb-3">
            <label className="form-label fw-bold">Order Type</label>
            <select
              className={`form-select ${errors.orderType ? 'is-invalid' : ''}`}
              {...register('orderType')}
            >
              <option value="takeaway">Takeaway</option>
              <option value="dine-in">Dine-in</option>
              <option value="delivery">Delivery</option>
            </select>
            {errors.orderType && (
              <div className="invalid-feedback">{errors.orderType.message}</div>
            )}
          </div>

          {selectedOrderType === 'dine-in' && (
            <div className="mb-3">
              <label className="form-label fw-bold">Table Number <span className="text-danger">*</span></label>
              <input
                type="text"
                className={`form-control ${errors.tableNumber ? 'is-invalid' : ''}`}
                {...register('tableNumber')}
                placeholder="e.g. Table 5"
              />
              {errors.tableNumber && (
                <div className="invalid-feedback">{errors.tableNumber.message}</div>
              )}
            </div>
          )}

          {selectedOrderType === 'delivery' && (
            <>
              <div className="mb-3">
                <label className="form-label fw-bold">Phone Number <span className="text-danger">*</span></label>
                <input
                  type="text"
                  className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                  {...register('phone')}
                  placeholder="e.g. 01012345678"
                />
                {errors.phone && (
                  <div className="invalid-feedback">{errors.phone.message}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Delivery Address <span className="text-danger">*</span></label>
                <textarea
                  className={`form-control ${errors.deliveryAddress ? 'is-invalid' : ''}`}
                  {...register('deliveryAddress')}
                  placeholder="Full address details..."
                  rows="2"
                ></textarea>
                {errors.deliveryAddress && (
                  <div className="invalid-feedback">{errors.deliveryAddress.message}</div>
                )}
              </div>
            </>
          )}
        </form>
      </CustomModal>
    </div>
  );
};

export default Cart;
