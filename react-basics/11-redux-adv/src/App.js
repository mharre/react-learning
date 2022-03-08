import { useSelector, useDispatch } from 'react-redux';
import { useEffect, Fragment } from 'react';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { uiActions } from './store/ui-slice';
import Notification from './components/UI/Notification';

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!'
      }));

      const response = await fetch('https://react-http-10a52-default-rtdb.firebaseio.com/cart.json', {
        method: 'PUT', // PUT will override existing data instead of just POST
        body: JSON.stringify(cart),
      })

      if (!response.ok) {
        throw new Error('Sending cart data failed');
      }

      //const responseData = await response.json(); // if we make it past this line we know it was sucessful yet we do not even need response data for this specific example, error is enough

      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sent cart data successfully!'
        })
      );
    };

    if (isInitial) {
      isInitial = false;
      return;
    } //blocks data to be sent when it first loads, if items in cart since it is a put request on the first initial load it resends a request and overrides the data with 0 items

    sendCartData().catch((error) => {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error!',
        message: 'Sending cart data has failed'
      }));
    });

  }, [cart, dispatch]);

  return (
    <Fragment>
      { notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
          />
      )}
      <Layout>
        { showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
