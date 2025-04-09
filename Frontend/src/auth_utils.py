import jwt

SECRET_KEY = "your_secret_key"  # Change this to a secure key

def verify_token(token):
    """ Verify JWT token and return decoded payload """
    try:
        decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return decoded  # Returns a dictionary with user info
    except jwt.ExpiredSignatureError:
        return None  # Token expired
    except jwt.InvalidTokenError:
        return None  # Invalid token
