import {APIError} from '../Errors/APIError';
import {ErrorResponse} from '../models/GenericAPIResponse';
import {AuthorizationHeader, BaseService} from './BaseService';
import {API_URL} from '../config';
import {Address} from '../models/Address';

export default class AddressService extends BaseService {
  static async getAddresses(): Promise<Address[]> {
    const response = await fetch(API_URL + 'Addresses', {
      method: 'GET',
      headers: {
        ...this.getCommonHeaders(AuthorizationHeader.Required),
      },
    });
    return await this.handleResponse<Address[]>(response);
  }

  static async updateAddress(addressId: number, data: Address): Promise<void> {
    const response = await fetch(
      API_URL + 'Addresses/' + encodeURIComponent(addressId),
      {
        method: 'PUT',
        headers: {
          ...this.getCommonHeaders(AuthorizationHeader.Required),
        },
        body: JSON.stringify(data),
      },
    );
    return await this.handleResponse<void>(response);
  }

  static async addAddress(data: Address): Promise<Address> {
    const response = await fetch(API_URL + 'Addresses', {
      method: 'POST',
      headers: {
        ...this.getCommonHeaders(AuthorizationHeader.Required),
      },
      body: JSON.stringify(data),
    });
    return await this.handleResponse<Address>(response);
  }

  static async deleteAddress(addressId: number): Promise<void> {
    const response = await fetch(
      API_URL + 'Addresses/' + encodeURIComponent(addressId),
      {
        method: 'DELETE',
        headers: {
          ...this.getCommonHeaders(AuthorizationHeader.Required),
        },
      },
    );
    return await this.handleResponse<void>(response);
  }

  static getEmptyAddress(): Address {
    return {
      id: 0,
      address: '',
      addressExtended: '',
      neighborhood: '',
      city: '',
      state: '',
      zipCode: '',
    } as Address;
  }

  static isSame(a: Address, b: Address): boolean {
    const allProps: Address = {...a, ...b};

    for (let propName in allProps) {
      if (propName === 'id') {
        continue;
      }
      if (
        String(a[propName as keyof Address] ?? '').trim() !==
        String(b[propName as keyof Address] ?? '').trim()
      ) {
        return false;
      }
    }
    return true;
  }

  static async getAddressesForUser(userId: string): Promise<Address[]> {
    const response = await fetch(
      API_URL + 'Addresses/user/' + encodeURIComponent(userId),
      {
        method: 'GET',
        headers: {
          ...this.getCommonHeaders(AuthorizationHeader.Required),
        },
      },
    );
    return await this.handleResponse<Address[]>(response);
  }

  static async updateAddressForUser(
    userId: string,
    addressId: number,
    data: Address,
  ): Promise<void> {
    const response = await fetch(
      API_URL +
        'Addresses/user/' +
        encodeURIComponent(userId) +
        ' /' +
        encodeURIComponent(addressId),
      {
        method: 'PUT',
        headers: {
          ...this.getCommonHeaders(AuthorizationHeader.Required),
        },
        body: JSON.stringify(data),
      },
    );
    return await this.handleResponse<void>(response);
  }

  static async addAddressForUser(
    userId: string,
    data: Address,
  ): Promise<Address> {
    const response = await fetch(
      API_URL + 'Addresses/user/' + encodeURIComponent(userId),
      {
        method: 'POST',
        headers: {
          ...this.getCommonHeaders(AuthorizationHeader.Required),
        },
        body: JSON.stringify(data),
      },
    );
    return await this.handleResponse<Address>(response);
  }

  static async deleteAddressForUser(
    userId: string,
    addressId: number,
  ): Promise<void> {
    const response = await fetch(
      API_URL +
        'Addresses/user/' +
        encodeURIComponent(userId) +
        '/' +
        encodeURIComponent(addressId),
      {
        method: 'DELETE',
        headers: {
          ...this.getCommonHeaders(AuthorizationHeader.Required),
        },
      },
    );
    return await this.handleResponse<void>(response);
  }
}
