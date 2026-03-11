
import re
import os

def get_logo_src(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    # Find the img tag with alt="Smart Stock Logo" and extract src
    match = re.search(r'<img[^>]+alt="Smart Stock Logo"[^>]+src="([^"]+)"', content)
    if match:
        return match.group(1)
    return None

login_path = r'c:\Users\Vini\Documents\Projeto Smart Stock\Projeto-Smart-Stock\login.html'
signup_path = r'c:\Users\Vini\Documents\Projeto Smart Stock\Projeto-Smart-Stock\signup.html'

login_src = get_logo_src(login_path)
signup_src = get_logo_src(signup_path)

if login_src == signup_src:
    print("MATCH: The logo src strings are identical.")
else:
    print("MISMATCH: The logo src strings are different.")
    if login_src and signup_src:
        print(f"Login length: {len(login_src)}")
        print(f"Signup length: {len(signup_src)}")
        # Print a small part of the difference if any
        for i in range(min(len(login_src), len(signup_src))):
            if login_src[i] != signup_src[i]:
                print(f"First mismatch at index {i}: '{login_src[i]}' vs '{signup_src[i]}'")
                break
    else:
        print(f"Login found: {login_src is not None}")
        print(f"Signup found: {signup_src is not None}")
