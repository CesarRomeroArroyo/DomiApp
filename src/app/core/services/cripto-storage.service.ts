import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
declare var require: any;
const SecureStorage = require('secure-web-storage');
const SECRET_KEY = 'TR4nsg0';


@Injectable({
  providedIn: 'root'
})
export class CriptoStorageService {

  constructor() { }
  
  public secureStorage = new SecureStorage(localStorage, {
    hash: function hash(key) {
      key = CryptoJS.SHA256(key, {SECRET_KEY});
      return key.toString();
    },
    encrypt: function encrypt(data) {
      data = CryptoJS.AES.encrypt(data, SECRET_KEY);
      data = data.toString();
      return data;
    },
    decrypt: function decrypt(data) {
      data = CryptoJS.AES.decrypt(data, SECRET_KEY);
      data = data.toString(CryptoJS.enc.Utf8);
      return data;
    }
  });

}
