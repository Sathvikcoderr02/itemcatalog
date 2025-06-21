import { useContext } from 'react';
import { ItemContext } from '../context/ItemContext';

export const useItems = () => {
  const context = useContext(ItemContext);
  if (context === undefined) {
    throw new Error('useItems must be used within an ItemProvider');
  }
  return context;
};
