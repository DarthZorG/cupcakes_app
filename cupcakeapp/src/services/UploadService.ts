import {APIError} from '../Errors/APIError';
import {ErrorResponse} from '../models/GenericAPIResponse';
import {AuthorizationHeader, BaseService} from './BaseService';
import {API_URL} from '../config';
import {UploadFileResponse} from '../models/UploadResponses';

export interface FileSource {
  uri: string;
  name: string;
  type: string;
}

export function getFileName(url: string): string {
  if (url) {
    var m = url.split('/').pop().split('#')[0].split('?')[0];
    return m;
  }
  return '';
}

export function makeFileSource(
  uri: string,
  mimeType: string = 'image/jpg',
): FileSource {
  const source: FileSource = {
    uri: uri,
    name: getFileName(uri),
    type: mimeType,
  };

  return source;
}

export default class UploadService extends BaseService {
  static async uploadFile(file: FileSource): Promise<UploadFileResponse> {
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);

    const response = await fetch(API_URL + 'Uploads', {
      method: 'POST',
      headers: {
        ...this.getCommonHeaders(AuthorizationHeader.Required),
        'Content-Type': 'multipart/form-data',
      },
      body: bodyFormData,
    });
    return await this.handleResponse<UploadFileResponse>(response);
  }
}
