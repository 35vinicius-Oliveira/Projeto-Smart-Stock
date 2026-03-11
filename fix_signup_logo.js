
const fs = require('fs');
const path = require('path');

const loginPath = 'c:\\Users\\Vini\\Documents\\Projeto Smart Stock\\Projeto-Smart-Stock\\login.html';
const signupPath = 'c:\\Users\\Vini\\Documents\\Projeto Smart Stock\\Projeto-Smart-Stock\\signup.html';

try {
    const loginContent = fs.readFileSync(loginPath, 'utf8');
    const signupContent = fs.readFileSync(signupPath, 'utf8');

    // Extract logo src from login.html
    const loginMatch = loginContent.match(/<img[^>]+alt="Smart Stock Logo"[^>]+src="([^"]+)"/);
    if (!loginMatch) {
        console.error("Could not find logo in login.html");
        process.exit(1);
    }
    const correctSrc = loginMatch[1];
    console.log(`Extracted logo src from login.html. Length: ${correctSrc.length}`);

    // Replace logo src in signup.html
    // Using a more robust regex that accounts for potential different attribute orders
    const updatedSignupContent = signupContent.replace(
        /(<img[^>]+alt="Smart Stock Logo"[^>]+src=")([^"]+)(")/,
        `$1${correctSrc}$3`
    );

    if (signupContent === updatedSignupContent) {
        console.error("Failed to replace logo in signup.html (no match or already identical)");
        process.exit(1);
    }

    fs.writeFileSync(signupPath, updatedSignupContent, 'utf8');
    console.log("Successfully updated signup.html with the correct logo.");

} catch (err) {
    console.error("An error occurred:", err);
    process.exit(1);
}
