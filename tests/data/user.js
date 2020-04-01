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
        'ya29.a0Adw1xeUGPF3F1-jizRT6kbYvgXVJFN72HihFywJ4BFBS-Scx6Y8c29SaY58Y64Z5dAI0JBsPlzNhWCp3K2aEMuo2rs2zdz1ud322BmvxjAdxtbaMGXj_PFbSTt9NQYnKDFWpwTrjDKXq1LiiUtQbZHdeRAh4HQsF4j4'
};

export const facebookUser = {
    access_token:
        'EAADjRsgzs0EBAHgGe788dOTlvcz8iBJMSvgZC2v0FFM6Lo0fKR1W6NIZAAuj6RRRC17ILq1gJqJbZBKCwnpEhmk57dZAPDdpouv6x9knUsNXnTQ81ENE2sN0ZA10ZBTPH8l7ZBi7qEFXC6tfbSeESYiSI6ZCZChpLttEIA6N3IMUYLogH5PVibRqiy5TJhBIJPRNEh5YKMaxzAaRBBokC4bWwmWOgOCOCW1yRupzZCdkFemgZDZD'
};
