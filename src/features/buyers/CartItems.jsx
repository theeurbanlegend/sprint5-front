import React from 'react';
import useAuth from '../../hooks/useAuth';
import { useGetBuyersQuery } from './userApiSlice';
import { useGetItemsQuery,useDeleteFromCartMutation } from '../items/itemApiSlice';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom';
import SmallLoader from '../spinner/SmallLoader';


const CartItems = () => {
  const [user, setUser] = React.useState(null);
  const [item, setItem] = React.useState(null);
  const navigate =useNavigate()
  const { username } = useAuth();
  const { data: items, isLoading:holding,isSuccess:gotit,isError:uhoh} = useGetItemsQuery();
  const { data: buyers, isLoading, isSuccess, isError, error } = useGetBuyersQuery();

  const [deleteCart]=useDeleteFromCartMutation()
  
  const handleDelete=(itemId)=>{
    deleteCart({buyerId:username,itemId})
    .unwrap()
        .then(() => {
            // Define an onSuccess callback to update the user state after the deletion is successful
          console.log('Item removed from cart successfully.');
        })
        .catch((err) => {
          console.error('Error removing item from cart:', err);
        });
  }
  // Step 2: Check local storage on component mount
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Step 3: Update user data in local storage
  React.useEffect(() => {
    if (isSuccess && buyers && items) {
      const foundBuyer = buyers.find((buyer) => buyer.username === username);
      const foundItem = items.find((item) => foundBuyer?.cartItems.includes(item._id));
      setUser(foundBuyer);
      setItem(foundItem);
      localStorage.setItem('user', JSON.stringify(foundBuyer)); // Save user data to local storage
    }
  }, [isSuccess, buyers, username]);

  let content;
  if (isLoading) {
    content = (<SmallLoader/>);
  }
  
  if (user === null || user.cartItems.length === 0) {
    return (<>
    <button onClick={()=>navigate('/user')}>Back to home</button>
    <div>No cart items to display</div>
    </>);
  }
  if(holding){
    content=(<SmallLoader/>)
  }
   if (isSuccess&&gotit) {
   // Calculate item quantities and total price in the user's cart
   const cartItemsCount = user?.cartItems.reduce((acc, itemId) => {
    acc[itemId] = (acc[itemId] || 0) + 1;
    return acc;
  }, {});

  const total = Object.keys(cartItemsCount).reduce((sum, itemId) => {
    const foundItem = items.find((item) => item._id === itemId);
    const quantity = cartItemsCount[itemId];
    return sum + foundItem?.price * quantity;
  }, 0);
 
  content = (
    <div>
      <button onClick={()=>navigate('/user')}>Back to home</button>
       <table className="item-table">
    <thead>
      <tr>
        <th>Itemname</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Total</th>
        <th>Actions</th>
      </tr>
    </thead>
      {Object.keys(cartItemsCount).map((itemId) => {
        const foundItem = items.find((item) => item._id === itemId);
        const quantity = cartItemsCount[itemId];
        return (
          content=       
        <tbody>
            <tr key={itemId}>
              <td>{foundItem?.itemname}</td>
              <td> {foundItem?.price} Ksh</td>
              <td> {quantity}</td>
              <td>{foundItem?.price * quantity} Ksh</td>
              <td>
              <FontAwesomeIcon className='del-icon' onClick={()=>handleDelete(itemId)} icon={faTrashCan} />
              </td>
            </tr>
        </tbody>
        );
      })}
      </table>
      <p>Total Price of All Items: Ksh {total}</p>
    </div>
  );
} else if (isError||items=='undefined') {
  content = <p>{error||'OOps Server Error'}</p>;
}

return content

};

export default CartItems;

