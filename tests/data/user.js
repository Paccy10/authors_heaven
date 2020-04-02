import bcrypt from 'bcryptjs';

export const newUser = {
    firstname: 'Test',
    lastname: 'User',
    email: 'test.user@app.com',
    password: 'Password12345',
    roleId: 3,
    allowNotifications: {
        inApp: true,
        email: true
    }
};

export const newUser2 = {
    firstname: 'Test',
    lastname: 'User',
    email: 'test.user2@app.com',
    password: bcrypt.hashSync('Password12345', 10),
    roleId: 3
};

export const newUser3 = {
    firstname: 'Test',
    lastname: 'User',
    email: 'test.user3@app.com',
    password: bcrypt.hashSync('Password12345', 10),
    image: {
        url:
            'http://res.cloudinary.com/dhsoe7agl/image/upload/v1584607994/authors%20heaven/users/jdgetoiuc6scvtz1sbw2.png',
        public_id: 'authors heaven/users/jdgetoiuc6scvtz1sbw2'
    },
    isActivated: true,
    roleId: 3,
    allowNotifications: {
        inApp: true,
        email: true
    }
};

export const newInvalidUser = {
    firstname: '',
    lastname: 'User',
    email: 'user@app.com',
    password: 'Password12345'
};

export const invalidUserWithLowercasePassword = {
    firstname: 'Test',
    lastname: 'User',
    email: 'user@app.com',
    password: 'password12345'
};

export const invalidUserWithUppercasePassword = {
    firstname: 'Test',
    lastname: 'User',
    email: 'user@app.com',
    password: 'PASSWORD12345'
};

export const invalidUserWithoutDigit = {
    firstname: 'Test',
    lastname: 'User',
    email: 'user@app.com',
    password: 'Password'
};

export const loginUser = {
    email: 'test.user3@app.com',
    password: 'Password12345'
};

export const loginUser2 = {
    email: 'test.user2@app.com',
    password: 'Password12345'
};

export const loginUser3 = {
    email: 'test@app.com',
    password: 'Password12345'
};

export const updatedUser = {
    firstname: 'Mocha',
    lastname: 'Chai',
    bio: 'Mocha is a nodejs testing library'
};

export const googleUser = {
    access_token:
        'ya29.a0Ae4lvC0bxfpXu6HPdYjqyoeYZpLVyyQDs4Bd-ch9ONk7XKv2X1JCE-5wlF0BOlvNtS5Ako8tr9XoLJxXtIfxu21ajdW7-vgVoIrFG3lQlwA3zNQxvQ6uEvHdZJk-Iiqb9kGMbvU97uLlVGw9wk-HWDRElj8hvpASWD4'
};

export const facebookUser = {
    access_token:
        'EAADjRsgzs0EBAP6OcLKtB5o5NOWuXQYQT9aKipZAb1XSnsrb0GPaoLTLsKychxCDyZCdTg1WYQSsaRFelGaOJZBS5jYjIZC76JBbcU708Nc2h6h40OHxgjB8v7aznxJZCxxCwIkfSJEEIFh4rHg7nLdnMLYmyKEZAu5g0mVFn4jSH5yMzst6jaaqLc4GdFr9ueTn4VqePdB1PdUQJYREtxTZCBUkdSomcQAnZBi8hkleRgZDZD'
};
