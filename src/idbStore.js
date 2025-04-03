import { useState, useEffect } from 'preact/hooks';
import { get, set, del } from 'idb-keyval';

// Shared event emitter for cross-component synchronization
const createStoreEmitter = () => {
  const listeners = new Map();

  return {
    subscribe(key, callback) {
      if (!listeners.has(key)) {
        listeners.set(key, new Set());
      }
      listeners.get(key).add(callback);
      return () => listeners.get(key).delete(callback);
    },
    emit(key, value) {
      if (listeners.has(key)) {
        listeners.get(key).forEach(cb => cb(value));
      }
    }
  };
};

const emitter = createStoreEmitter();

function useStore(key, initialValue) {
  const [storedValue, setStoredValue] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(true);

  // Load initial value and subscribe to changes
  useEffect(() => {
    let isMounted = true;

    const loadInitialValue = async () => {
      try {
        const value = await get(key);
        if (isMounted) {
          setStoredValue(value !== undefined ? value : initialValue);
        }
      } catch (error) {
        console.error(`Error loading "${key}":`, error);
        if (isMounted) setStoredValue(initialValue);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    const unsubscribe = emitter.subscribe(key, (newValue) => {
      if (isMounted) setStoredValue(newValue !== undefined ? newValue : initialValue);
    });

    loadInitialValue();

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [key, initialValue]);

  // Persistent setter with event emission
  const setValue = async (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      await set(key, valueToStore);
      setStoredValue(valueToStore);
      emitter.emit(key, valueToStore);
    } catch (error) {
      console.error(`Error saving "${key}":`, error);
    }
  };

  // Delete function with event emission
  const deleteValue = async () => {
    try {
      await del(key);
      setStoredValue(initialValue);
      emitter.emit(key, initialValue);
    } catch (error) {
      console.error(`Error deleting "${key}":`, error);
    }
  };

  return [storedValue, setValue, deleteValue, isLoading];
}

export default useStore;