import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';

const CartTotal = ({ giftWrapSelected = false }) => {
    const {currency, delivery_fee, getCartAmount} = useContext(ShopContext);

    // Constants
    const giftWrapPrice = 25;
    const subtotal = getCartAmount();
    const giftWrapTotal = giftWrapSelected ? giftWrapPrice : 0;
    const gst = subtotal * 0.18;
    const total = subtotal + gst + giftWrapTotal;

    return (
        <div className='w-full'>
            

            {/* Billing Details */}
            <h1 className="text-gray-500  font-semibold mb-4 instrument-sans-regular">BILLING DETAILS</h1>
            

            <div className="bg-white border border-gray-200 p-4"> 
                
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-700 instrument-sans-regular">Cart Total (Excl. of all taxes)</span>
                        <span className="font-semibold instrument-sans-regular">{currency} {subtotal.toFixed(2)}</span>
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
                </div>
            </div>
        </div>
    )
}

export default CartTotal