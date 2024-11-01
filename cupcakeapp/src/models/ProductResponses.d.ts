import {UploadFile} from './UploadFileResponses';

export interface Product {
  id: number;
  name: string;
  price: number;
  flavor: string;
  description: string;
  enabled: boolean;
  glutenFree: boolean;
  lactoseFree: boolean;
  sugarFree: boolean;
  displayOrder: number;
  imageId?: number | null;
  updatedAt?: string | null;
  createdAt?: string | null;
  picture?: UploadFile | null;
}


export type ProductListResponse = Product[];
