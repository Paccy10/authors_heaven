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
        'ya29.a0Ae4lvC3au4V6uhc00Vi27OMNV2M0599hlGm0PMp_SZ-zBjDnmV82wsMw6OOiZtGBr9ti2aIPtwsLMEVQkpKWqWI7CWk2MxPYirlbl42mjF2qkQcv-0LBXkdFfyH6NXc-ZaCTfrkWxRHoG3abPWRjXjOl0awVAYhVzp3h'
};

export const facebookUser = {
    access_token:
        'EAADjRsgzs0EBAPje5LrZB2iijTasWTCOQAaA8mHtkSBn0PlJV2u3rIruszXZBCySWRnCxtI4aA7O2QkJyNDI9omhq8L28kg90ScXMxis1p52gsPBOfqlkW4dfiJJeiCQZBZAYTA8BHvCrMjCqBA6bjBHSZCMlXUIyfHKY0hMQMGAEZAcPf5LZBg0cd8is3RdFj3ZCUCtWIOsQ7xMtn3vm2OvN0r4X8UA6Ad6o7IzHErHuwZDZD'
};
