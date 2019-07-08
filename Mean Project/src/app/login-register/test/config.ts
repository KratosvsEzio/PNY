// import {config} from "../app.config";
import {Buffer} from 'buffer/';
import * as crypto from 'crypto-browserify';

export class RsaService {
  private privateKey: string;
  private publicKey: string;
  private enabled: boolean;

  constructor() {
    // this.privateKey = config.authentication.rsa.privateKey;
    // this.publicKey = config.authentication.rsa.publicKey;
    // this.enabled = config.authentication.rsa.enabled;

    this.privateKey = '1234567890123456';
    this.publicKey = '1234567890123456';
    this.enabled = false;
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  encrypt(plaintext: string): string {
    if (!this.enabled) {
      return plaintext;
    }

    const buffer = new Buffer(plaintext);
    const encrypted = crypto.privateEncrypt(this.privateKey, buffer);

    return encrypted.toString('base64');
  }

  decrypt(cypher: string): string {
    if (!this.enabled) {
      return cypher;
    }

    const buffer = Buffer.from(cypher, 'base64');
    const plaintext = crypto.publicDecrypt(this.publicKey, buffer);

    return plaintext.toString('utf8')
  }
}
