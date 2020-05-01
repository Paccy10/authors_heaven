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
        'ya29.a0Ae4lvC3yANVOMOYt9wul-TDaeIPOoF9G6_Xx-2oc_ygZk94NskxS7-UNEkEQtmXFOBh9vCDzQc6_Y6C3D3HTOGXYOe78nBXz2cWx5HMHOPL-gHrxVtQpeTTp_82S7zc3G7FC-EWRXrNEab_xVEL3PHWQZgAAnY6tTU0'
};

export const facebookUser = {
    access_token:
        'EAADjRsgzs0EBAGDU7qjZCAGM9mOIJ4cUdVgTXbq0KPcJkUuuyiZCgjrxY19OyGLV5JdfC1418ArSYnQwQ75GDdiXcdmBtVfCyliIm5ec5aMcrjA9rpCaTZBLtPfLDxyC2F4SaZAisZCW0slZCNh6z5LtTzApLvCVjGGEZBzExXrHFSF5tpEycjcQrsZAw3ZAvQh4ZD'
};
