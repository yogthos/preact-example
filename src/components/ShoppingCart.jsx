import { useState } from 'preact/hooks';
import useStore from '../idbStore';

const ShoppingCart = () => {
  const [cart, setCart, clearCart, isLoading] = useStore('shopping-cart', []);
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');

  const addItem = (e) => {
    e.preventDefault();
    if (!newItemName || !newItemPrice) return;
    
    setCart(prevCart => [
      ...prevCart,
      {
        id: Date.now(),
        name: newItemName,
        price: parseFloat(newItemPrice)
      }
    ]);
    
    setNewItemName('');
    setNewItemPrice('');
  };

  const removeItem = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  if (isLoading) {
    return (
      <div class="section">
        <div class="container">
          <progress class="progress is-small is-primary" max="100">Loading...</progress>
        </div>
      </div>
    );
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div class="section">
      <div class="container">
        <h1 class="title">Shopping Cart</h1>
        
        {/* Add Item Form */}
        <div class="box">
          <form onSubmit={addItem}>
            <div class="field is-grouped">
              <div class="control is-expanded">
                <input
                  class="input"
                  type="text"
                  placeholder="Item name"
                  value={newItemName}
                  onInput={(e) => setNewItemName(e.target.value)}
                />
              </div>
              <div class="control">
                <input
                  class="input"
                  type="number"
                  step="0.01"
                  placeholder="Price"
                  value={newItemPrice}
                  onInput={(e) => setNewItemPrice(e.target.value)}
                />
              </div>
              <div class="control">
                <button type="submit" class="button is-primary">
                  Add Item
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Cart Items */}
        <div class="box">
          {cart.length === 0 ? (
            <div class="notification">Your cart is empty</div>
          ) : (
            <>
              <div class="table-container">
                <table class="table is-fullwidth is-striped">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Price</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map(item => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>${item.price.toFixed(2)}</td>
                        <td>
                          <button 
                            class="button is-danger is-small"
                            onClick={() => removeItem(item.id)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div class="has-text-right mt-4">
                <h2 class="title is-4">
                  Total: ${total.toFixed(2)}
                </h2>
              </div>
            </>
          )}
        </div>

        {/* Clear Cart Button */}
        <div class="has-text-centered">
          <button 
            onClick={clearCart} 
            class="button is-danger"
            disabled={cart.length === 0}
          >
            Clear Entire Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;