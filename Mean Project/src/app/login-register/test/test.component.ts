import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
// import * as RSA from './configRSA';
// import { RsaService } from './config';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor() { }

  ngOnInit(){
    const encrypted = this.set('123456$#@$^@1ERF123456$#@$^@1ERF', 'hello');
    const decrypted = this.get('123456$#@$^@1ERF123456$#@$^@1ERF', encrypted);

    console.log('Encrypted :' + encrypted);
    console.log('Encrypted :' + decrypted);


    // const rsa = new RSA

    // console.log('RSA :' + RSA);
  }
  set(keys, value){
    var key = CryptoJS.enc.Utf8.parse(keys);
    var iv = CryptoJS.enc.Utf8.parse(keys);
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key,
    {
        keySize: 256 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.toString();
  }
  get(keys, value){
    var key = CryptoJS.enc.Utf8.parse(keys);
    var iv = CryptoJS.enc.Utf8.parse(keys);
    var decrypted = CryptoJS.AES.decrypt(value, key, {
        keySize: 256 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}
