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
        'ya29.a0Ae4lvC1RDQvKoUyHs79tLl5zVwVmnx606_N9imOOGyqD0WXpM7VJK7YLMWQrbXVEYU59MJvUMORX9G-cBuVmS1tHbW0D49xF0cjJcoc6jpA4zE8JBvTcJyVCT_3W2A09HyPr8KRVTPRGG820Bs645g7_5ZtbwRApRm8'
};

export const facebookUser = {
    access_token:
        'EAADjRsgzs0EBANADnvoFJBuKFG1vsKx6BJAemi4ZCFRwH1NCv6dwGixW1dI5RDJZB43FImZB2P0fQWz8HdoU2yilqKynR6Kl8ejm8Eua4U7I6oLtCx52BG1e5NXpWPuZBMyHM77499c7Jr9ZCklgKwD5v3EfdhQZBGQxfjohkdbWSupactDwZCYYbXU3Q0LEujWtLS8oyFSiGBFGdMN4ZAzuHJWsGXbpwZBqoOIfskufXNQZDZD'
};
