//'use client'
import CryptoJS from 'crypto-js';


const SECRET_KEY = 'mysecretkey';

CryptoJS.rf

export const encryptData = (name, data) => {
    const encrypted = CryptoJS.DES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
    localStorage.setItem(name, encrypted);
}




function decryptData(name) {

    try {


        const decrypted = localStorage.getItem(name) ? (CryptoJS.DES.decrypt(localStorage.getItem(name), SECRET_KEY).toString(CryptoJS.enc.Utf8)) : null;
        return JSON.parse(decrypted);

    }
    catch (error) {
        console.log('decrypterror', error)
    }
} export default decryptData