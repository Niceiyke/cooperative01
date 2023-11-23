'use client'
import CryptoJS from 'crypto-js';


const SECRET_KEY = 'mysecretkey';

export const encryptData = (name, data) => {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
    localStorage.setItem(name, encrypted);
}


export const decryptData = (name) => {

    if (typeof window !== 'undefined') {
    
        const decrypted = localStorage.getItem(name)?CryptoJS.AES.decrypt(localStorage.getItem(name), SECRET_KEY).toString(CryptoJS.enc.Utf8):null;
    return JSON.parse(decrypted);
    }
}