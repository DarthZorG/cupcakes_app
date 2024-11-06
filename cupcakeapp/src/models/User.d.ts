import {UploadFile} from './UploadFile';

export interface IUser {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  avatar?: UploadFile | null;
  email: string;
  phoneNumber?: string | null;
  avatarId?: number | null;
}
