import React from 'react';
import { Link } from 'react-router-dom';
import { pluralize } from '../../utils/helpers';
import { useStoreContext } from '../../utils/GlobalState';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';

function ProductItem(item) {
  const [state, dispatch] = useStoreContext();

  const { image, name, _id, price, quantity } = item;

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
    <div className="m-4 flex flex-col border-2 border-primary-900 overflow-hidden rounded-md drop-shadow-lg bg-primary-200/30">
      <div className="min-h-80 aspect-w-1 aspect-h-1 w-full group-hover:opacity-75 lg:aspect-none lg:h-80 rounded-t-sm overflow-hidden">
        <Link to={`/products/${_id}`}>
          <img alt={name} src={`/images/${image}`} className="h-full w-full object-cover object-center lg:h-full lg:w-full border-b-2 border-primary-900" />
        </Link>
      </div>
      <div className='flex flex-row divide-x-2 divide-primary-900 border-b-2 border-primary-900'>
        <p className="w-10/12 p-2 pb-3 text-xl font-semibold text-primary-100">{name}</p>
        <p className='w-2/12 text-xl font-semibold text-primary-100 p-2 text-center'>${price}</p>
      </div>

      <div>
        
      </div>
      <div>
        {quantity} {pluralize('item', quantity)} in stock
      </div>
      <button onClick={addToCart}>Add to cart</button>
    </div>
  );
}

export default ProductItem;
