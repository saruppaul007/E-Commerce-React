import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Tag, Gift, Package } from 'lucide-react';

const CartSummary = ({ 
  currency, 
  selectedItemsCount, 
  selectedSubtotal, 
  navigate,
  giftWrapSelected,
  setGiftWrapSelected 
}) => {
  const [couponExpanded, setCouponExpanded] = useState(false);
  const [giftVoucherExpanded, setGiftVoucherExpanded] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [voucherCode, setVoucherCode] = useState('');

  const giftWrapPrice = 25;
  const giftWrapTotal = giftWrapSelected ? giftWrapPrice : 0;
  const shippingFee = selectedSubtotal > 0 ? 10 : 0;
  const gst = selectedSubtotal * 0.18;
  const total = selectedSubtotal + gst + giftWrapTotal;

  const handleApplyCoupon = () => {
    console.log('Applying coupon:', couponCode);
  };

  const handleApplyVoucher = () => {
    console.log('Applying voucher:', voucherCode);
  };

  const handleGiftWrapChange = (e) => {
    setGiftWrapSelected(e.target.checked);
  };

  return (
    <div className="lg:col-span-1">
      {/* Place Order Button */}
      <button
        onClick={() => navigate('/place-order')}
        disabled={selectedItemsCount === 0}
        className={`w-full py-3 px-6 font-semibold transition-colors rounded-lg mb-2 instrument-sans-regular ${
          selectedItemsCount > 0 
            ? 'bg-[--green] text-white hover:bg-[#509954] ' 
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        PLACE ORDER {selectedItemsCount > 0 }
      </button>

      <div className="bg-white border border-gray-200 p-0 top-4">
        {/* Apply Coupon */}
        <div className="border-b">
          <button 
            className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            onClick={() => setCouponExpanded(!couponExpanded)}
          >
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-gray-600" />
              <span className="text-gray-700 instrument-sans-regular">Apply Coupon</span>
            </div>
            {couponExpanded ? (
              <FontAwesomeIcon icon={faChevronUp} className="w-4 h-4 text-gray-600" />
            ) : (
              <FontAwesomeIcon icon={faChevronDown} className="w-4 h-4 text-gray-600" />
            )}
          </button>
          {couponExpanded && (
            <div className="px-4 pb-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter Code Here"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-400 instrument-sans-regular"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="px-4 py-2 bg-white border border-[--green] text-[--green] rounded-lg text-sm font-semibold hover:bg-[--green] hover:text-white duration-300 transition-colors instrument-sans-regular"
                >
                  APPLY
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Gift Voucher */}
        <div className="border-b">
          <button 
            className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            onClick={() => setGiftVoucherExpanded(!giftVoucherExpanded)}
          >
            <div className="flex items-center gap-2">
              <Gift className="w-4 h-4 text-gray-600" />
              <span className="text-gray-700 instrument-sans-regular">Gift Voucher</span>
            </div>
            {giftVoucherExpanded ? (
              <FontAwesomeIcon icon={faChevronUp} className="w-4 h-4 text-gray-600" />
            ) : (
              <FontAwesomeIcon icon={faChevronDown} className="w-4 h-4 text-gray-600" />
            )}
          </button>
          {giftVoucherExpanded && (
            <div className="px-4 pb-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter Code Here"
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-400 instrument-sans-regular"
                />
                <button
                  onClick={handleApplyVoucher}
                  className="px-4 py-2 bg-white border border-[--green] text-[--green] rounded-lg text-sm font-semibold hover:bg-[--green] hover:text-white duration-300 transition-colors instrument-sans-regular"
                >
                  APPLY
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Gift Wrap */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-gray-600" />
              <span className="text-gray-700 instrument-sans-regular">Gift Wrap ({currency} {giftWrapPrice})</span>
            </div>
            <input 
              type="checkbox" 
              className="w-4 h-4 cursor-pointer"
              checked={giftWrapSelected}
              onChange={handleGiftWrapChange}
            />
          </div>
        </div>
      </div>
        
      {/* Billing Details */}
      <div className="p-4">
        <h3 className="text-gray-400 text-sm font-semibold mb-4 instrument-sans-regular">BILLING DETAILS</h3>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-700 instrument-sans-regular">Cart Total (Excl. of all taxes)</span>
            <span className="font-semibold instrument-sans-regular">{currency} {selectedSubtotal.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-700 instrument-sans-regular">GST</span>
            <span className="font-semibold instrument-sans-regular">{currency} {gst.toFixed(2)}</span>
          </div>
          
          {giftWrapSelected && (
            <div className="flex justify-between items-center">
              <span className="text-gray-700 instrument-sans-regular">Gift Wrap</span>
              <span className="font-semibold instrument-sans-regular">{currency} {giftWrapPrice.toFixed(2)}</span>
            </div>
          )}
          
          <div className="flex justify-between items-center">
            <span className="text-gray-700 instrument-sans-regular">Shipping Charges</span>
            <div className="text-right">
              <span className="text-green-600 font-semibold instrument-sans-regular">Free</span>
              {giftWrapSelected && (
                <div className="text-xs text-gray-500 instrument-sans-regular">Gift wrap will be applied</div>
              )}
            </div>
          </div>
          
          <div className="flex justify-between items-center pt-3 border-t font-bold text-lg">
            <span className='instrument-sans-regular'>Total Amount</span>
            <span className='instrument-sans-regular'>{currency} {total.toFixed(2)}</span>
          </div>

          {selectedItemsCount === 0 && (
            <div className="text-center text-gray-500 text-sm mt-4 instrument-sans-regular">
              Please select items to see total amount
            </div>
          )}
        </div>
      </div>

      {/* Bottom Place Order Button */}
      <button
        onClick={() => navigate('/place-order')}
        disabled={selectedItemsCount === 0}
        className={`w-full py-3 px-6 font-semibold transition-colors mt-2 rounded-lg instrument-sans-regular ${
          selectedItemsCount > 0 
            ? 'bg-[--green] text-white hover:bg-[#509954]' 
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        PLACE ORDER {selectedItemsCount > 0 }
      </button>
    </div>
  );
};

export default CartSummary;