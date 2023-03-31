import React from 'react';
import { Link } from 'react-router-dom';
// import { pluralize } from '../../utils/helpers';
import { useStoreContext } from '../../utils/GlobalState';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';

import { PlusIcon } from '@heroicons/react/24/solid';

function ProductItem(item) {
  const [state, dispatch] = useStoreContext();

  const { image, name, _id, price, quantity, description, size } = item;
  // console.log(item);

  const { cart } = state;

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 },
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  };

  return (
    <div className="m-4 border-2 border-primary-900 overflow-hidden rounded-md shadow-sm bg-primary-200/30 ">
      <div className="min-h-80 aspect-w-1 aspect-h-1 w-full group-hover:opacity-75 lg:aspect-none lg:h-80 rounded-t-sm overflow-hidden border-b-2 border-primary-900">
        <Link to={`/products/${_id}`}>
          <img alt={name} src={`/images/${image}`} className="h-full w-full object-cover object-center lg:h-full lg:w-full hover:scale-105 active:scale-100 duration-300 transform-gpu transition-all" />
        </Link>
      </div>
      <div className="flex flex-row border-b-2 border-primary-900 items-center">
        <p className="w-9/12  p-2 pb-2 text-xl font-semibold text-primary-100 border-r-2 border-primary-900 line-clamp-1 leading-10 select-none">{name}</p>
        <p className="w-3/12  text-xl font-semibold text-primary-100 p-2 text-center select-none">${price}</p>
      </div>
      <div className='grid h-44 content-between'>
        <p className="m-2 text-primary-100/80 font-light line-clamp-4 select-none">{description}</p>
        <div className="flex flex-row justify-between">
        
        {size && <div className="px-2 font-bold text-primary-100 select-none flex items-center">{size}</div>}
          <p className="p-2 font-regular text-primary-100 select-none flex items-center">
            {quantity} in stock
            {/* {pluralize('item', quantity)} */}
          </p>
          <button onClick={addToCart} className="p-2 font-medium text-primary-900 flex bg-primary-100/30 hover:bg-teal-400 active:bg-orange-400 transition rounded-tl-md border-t-2 border-l-2 border-primary-900">
            <PlusIcon className="h-6 mr-1" />
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
