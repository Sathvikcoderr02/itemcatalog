import { createContext, useState, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Define types locally to avoid import issues
type ItemType = 'Shirt' | 'Pant' | 'Shoes' | 'Sports Gear' | 'Accessories' | 'Outerwear' | 'Underwear' | 'Swimwear' | 'Activewear' | 'Other';

interface Item {
  id: string;
  name: string;
  type: ItemType;
  description: string;
  coverImage: string;
  images: string[];
  createdAt: string;
}

interface ItemFormData extends Omit<Item, 'id' | 'createdAt'> {
  // This interface is the same as Item but without id and createdAt
  // as they are generated when the item is created
}

// Define the shape of our context value
interface ItemContextType {
  items: Item[];
  addItem: (itemData: ItemFormData) => void;
  getItem: (id: string) => Item | undefined;
}

// Create the context with a default undefined value but proper type
export const ItemContext = createContext<ItemContextType | undefined>(undefined);

const initialItems: Item[] = [
  {
    id: '1',
    name: 'Classic White T-Shirt',
    type: 'Shirt',
    description: 'A comfortable white t-shirt made from 100% organic cotton.',
    coverImage: 'https://picsum.photos/id/1005/300/400',
    images: [
      'https://picsum.photos/id/1005/300/400',
      'https://picsum.photos/id/1006/300/400'
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Slim Fit Jeans',
    type: 'Pant',
    description: 'Stylish slim fit jeans with a comfortable stretch fabric.',
    coverImage: 'https://picsum.photos/id/1025/300/400',
    images: [
      'https://picsum.photos/id/1025/300/400',
      'https://picsum.photos/id/1027/300/400'
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Running Shoes',
    type: 'Shoes',
    description: 'Lightweight running shoes with excellent cushioning.',
    coverImage: 'https://picsum.photos/id/103/300/400',
    images: [
      'https://picsum.photos/id/103/300/400',
      'https://picsum.photos/id/104/300/400'
    ],
    createdAt: new Date().toISOString()
  }
].map(item => ({
  ...item,
  type: item.type as ItemType // Ensure type matches our ItemType
}));

interface ItemProviderProps {
  children: ReactNode;
}

export const ItemProvider = ({ children }: ItemProviderProps) => {
  const [items, setItems] = useState<Item[]>(() => {
    const savedItems = localStorage.getItem('items');
    return savedItems ? JSON.parse(savedItems) : initialItems;
  });

  const saveItems = useCallback((newItems: Item[]) => {
    setItems(newItems);
    localStorage.setItem('items', JSON.stringify(newItems));
  }, []);

  const addItem = useCallback((itemData: ItemFormData) => {
    const newItem: Item = {
      ...itemData,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      type: itemData.type as ItemType // Ensure type matches our ItemType
    };
    const updatedItems = [...items, newItem];
    saveItems(updatedItems);
  }, [items, saveItems]);

  const getItem = useCallback((id: string) => {
    return items.find(item => item.id === id);
  }, [items]);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    items,
    addItem,
    getItem
  }), [items, addItem, getItem]);

  return (
    <ItemContext.Provider value={contextValue}>
      {children}
    </ItemContext.Provider>
  );
};

// ItemContext is already exported above
