import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import CartItem from '../components/CartItem';
import Auth from '../utils/auth';
import { useStoreContext } from '../utils/GlobalState';
import { ADD_MULTIPLE_TO_CART } from '../utils/actions';

import { FaceFrownIcon } from "@heroicons/react/24/solid";

// stripePromise returns a promise with the stripe object as soon as the Stripe package loads
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Cart = () => {
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  // We check to see if there is a data object that exists, if so this means that a checkout session was returned from the backend
  // Then we should redirect to the checkout with a reference to our session id
  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  // If the cart's length or if the dispatch function is updated, check to see if the cart is empty.
  // If so, invoke the getCart method and populate the cart with the existing from the session
  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  // When the submit checkout method is invoked, loop through each item in the cart
  // Add each item id to the productIds array and then invoke the getCheckout query passing an object containing the id for all our products
  function submitCheckout() {
    const productIds = [];

    state.cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    });

    getCheckout({
      variables: { products: productIds },
    });
  }
  // return (
  //   <div className="mt-8">
  //     <div className="flow-root">
  //       <ul role="list" className="-my-6 divide-y divide-gray-200">
  //         {state.cart.map((item) => (
  //           <CartItem key={item._id} item={item} >
  //             <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
  //               <img src={item.imageSrc} alt={item.imageAlt} className="h-full w-full object-cover object-center" />
  //             </div>

  //             <div className="ml-4 flex flex-1 flex-col">
  //               <div>
  //                 <div className="flex justify-between text-base font-medium text-gray-900">
  //                   <h3>
  //                     <a href={item.href}>{item.name}</a>
  //                   </h3>
  //                   <p className="ml-4">{item.price}</p>
  //                 </div>
  //                 <p className="mt-1 text-sm text-gray-500">{item.color}</p>
  //               </div>
  //               <div className="flex flex-1 items-end justify-between text-sm">
  //                 <p className="text-gray-500">Qty {item.quantity}</p>

  //                 <div className="flex">
  //                   <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
  //                     Remove
  //                   </button>
  //                 </div>
  //               </div>
  //             </div>
  //           </CartItem>
  //         ))}
  //       </ul>
  //     </div>
  //   </div>
  // );
  return (
    <div className='p-6 border-t-2 border-primary-900 h-full'>
      {state.cart.length ? (
        <div>
          {state.cart.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}
          <div>
          <p>Total: $ {calculateTotal()}</p>
          {Auth.loggedIn() ? <div onClick={submitCheckout} className='bg-primary-100/40 hover:bg-orange-400 active:bg-teal-400 transition p-2 w-36 text-center rounded-md text-primary-900 border-2 border-primary-900 cursor-pointer'>Checkout</div> : <span>(log in to check out)</span>}
          </div>
        </div>
      ) : (
        <div className='flex items-center justify-center py-20'>
          
          <FaceFrownIcon className="h-8 w-8 text-primary-300" />
          <p className='px-4 text-lg select-none'>nothing to see here - add something to your cart!</p> 
          <FaceFrownIcon className="h-8 w-8 text-primary-300" />
        </div>
      )}
    </div>
  );

};

export default Cart;
