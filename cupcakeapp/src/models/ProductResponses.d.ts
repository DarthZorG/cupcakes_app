import {GenericAPIResponse} from './GenericAPIResponse';
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
  updatedAt: string;
  createdAt: string;
  imageId: number;
  picture: UploadFile;
}

export type ProductListResponse = Product[];
