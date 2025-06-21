export interface Item {
  id: string;
  name: string;
  type: string;
  description: string;
  coverImage: string;
  images: string[];
  createdAt: string;
}

export interface ItemFormData extends Omit<Item, 'id' | 'createdAt'> {
  // This interface is the same as Item but without id and createdAt
  // as they are generated when the item is created
}

export type ItemType = 
  | 'Shirt' 
  | 'Pant' 
  | 'Shoes' 
  | 'Sports Gear' 
  | 'Accessories' 
  | 'Outerwear' 
  | 'Underwear' 
  | 'Swimwear' 
  | 'Activewear' 
  | 'Other';
