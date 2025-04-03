import ShoppingCart from './ShoppingCart.jsx';
import useStore from '../idbStore';

function CartView () {
  const [cart] = useStore('shopping-cart');
  if (!cart) {
    return <div>Loading cart...</div>;
  }
  return (
    <div>
      <h2>Shopping Cart ({cart.length} items)</h2>      
      <ul>
        {cart.map(item => (
          <li key={item.id}>
            {item.name} - ${item.price}            
          </li>
        ))}
      </ul>      
    </div>
  )
}

export default function Home() {
  return (
    <section class="section">
      <div class="container">
        <div class="content">
          <h1>Home Page</h1>
          <p>Welcome to our website!</p>
          <ShoppingCart />
          <hr />
          <CartView />
        </div>
      </div>
    </section>
  );
};