export interface Item {
    id: string;
    name: string;
    type: string;
    description: string;
    coverImage: string;
    images: string[];
    createdAt: string;
  }
  
  export type ItemFormData = Omit<Item, 'id' | 'createdAt'>;
  