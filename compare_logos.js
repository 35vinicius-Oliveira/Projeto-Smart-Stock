
const fs = require('fs');
const path = require('path');

function getLogoSrc(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const match = content.match(/<img[^>]+alt="Smart Stock Logo"[^>]+src="([^"]+)"/);
    return match ? match[1] : null;
}

const loginPath = 'c:\\Users\\Vini\\Documents\\Projeto Smart Stock\\Projeto-Smart-Stock\\login.html';
const signupPath = 'c:\\Users\\Vini\\Documents\\Projeto Smart Stock\\Projeto-Smart-Stock\\signup.html';

const loginSrc = getLogoSrc(loginPath);
const signupSrc = getLogoSrc(signupPath);

if (loginSrc === signupSrc) {
    console.log("MATCH: The logo src strings are identical.");
} else {
    console.log("MISMATCH: The logo src strings are different.");
    if (loginSrc && signupSrc) {
        console.log(`Login length: ${loginSrc.length}`);
        console.log(`Signup length: ${signupSrc.length}`);
        const minLen = Math.min(loginSrc.length, signupSrc.length);
        for (let i = 0; i < minLen; i++) {
            if (loginSrc[i] !== signupSrc[i]) {
                console.log(`First mismatch at index ${i}: '${loginSrc[i]}' vs '${signupSrc[i]}'`);
                break;
            }
        }
    } else {
        console.log(`Login found: ${!!loginSrc}`);
        console.log(`Signup found: ${!!signupSrc}`);
    }
}
