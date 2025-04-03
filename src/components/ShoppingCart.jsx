import { signal, computed } from "@preact/signals";
import { useSignal } from "@preact/signals";

// Define cart items signal
const cartItems = signal([
  { id: 1, name: "T-Shirt", price: 25.99, quantity: 2 },
  { id: 2, name: "Coffee Mug", price: 12.50, quantity: 1 },
]);

// Computed total price
const totalPrice = computed(() =>
  cartItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
);

function ShoppingCart() {
  // Local state for new item input
  const newItemName = useSignal("");
  const newItemPrice = useSignal("");

  const addItem = () => {
    if (newItemName.value && newItemPrice.value) {
      cartItems.value = [
        ...cartItems.value,
        {
          id: self.crypto.randomUUID(),
          name: newItemName.value,
          price: parseFloat(newItemPrice.value),
          quantity: 1
        }
      ];
      newItemName.value = "";
      newItemPrice.value = "";
    }
  };

  const removeItem = (id) => {
    cartItems.value = cartItems.value.filter(item => item.id !== id);
  };

  const updateQuantity = (id, quantity) => {
    cartItems.value = cartItems.value.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    );
  };

  return (
    <div class="section">
      <div class="container">
        <h1 class="title">Shopping Cart</h1>

        {/* Add Item Form */}
        <div class="box">
          <div class="field is-grouped">
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="Item name"
                value={newItemName.value}
                onInput={(e) => newItemName.value = e.target.value}
              />
            </div>
            <div class="control">
              <input
                class="input"
                type="number"
                step="0.01"
                placeholder="Price"
                value={newItemPrice.value}
                onInput={(e) => newItemPrice.value = e.target.value}
              />
            </div>
            <div class="control">
              <button class="button is-primary" onClick={addItem}>
                Add Item
              </button>
            </div>
          </div>
        </div>

        {/* Cart Items */}
        <div class="box">
          {cartItems.value.length === 0 ? (
            <p class="subtitle">Your cart is empty</p>
          ) : (
            <>
              <table class="table is-fullwidth">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.value.map(item => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>${item.price.toFixed(2)}</td>
                      <td>
                        <input
                          class="input"
                          type="number"
                          value={item.quantity}
                          min="1"
                          onInput={(e) =>
                            updateQuantity(item.id, parseInt(e.target.value))
                          }
                        />
                      </td>
                      <td>${(item.price * item.quantity).toFixed(2)}</td>
                      <td>
                        <button
                          class="button is-danger"
                          onClick={() => removeItem(item.id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div class="has-text-right mt-4">
                <h2 class="title is-4">
                  Total: ${totalPrice.value.toFixed(2)}
                </h2>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;