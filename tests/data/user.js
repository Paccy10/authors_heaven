import bcrypt from 'bcryptjs';

export const newUser = {
    firstname: 'Test',
    lastname: 'User',
    email: 'test.user@app.com',
    password: 'Password12345',
    roleId: 3
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
    roleId: 3
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
        'ya29.a0Adw1xeWxaAiyuFCoHVNJXOVifWEPpdLTzC-6zK0T0BhH6P0N7fdvC5z-xEww6J5OI092gHwPn2XKffz667Dmd3Cvd3rN4J9kGfK8CbG2EjO0YWJz0lAtRBGDWBEr0n3ldwWvEAKJI6nVl6yNIXAnPVgclllISGf5vTo'
};

export const facebookUser = {
    access_token:
        'EAADjRsgzs0EBAMstN67sPG9EWL2KZAFv1uFYTC94EFOuyEkVCJYX2bgnpJK0Ci3P9JtZClASXXzcx4JyXxnmHXru2ngAuJs8ymqN6Ks0yaaZBsdPUeOCGTZCfec7dURue8pE8mPzYtMZAc7T5T46KRw8LjYy3MP9ZBSnGKHDl0SEtuTYznSsHx238IT0nonZA8uXZBFwzd52P7XK7qirUO71ZCfDOHvRplxkZBEhJY8SVGZAgOUEzFmlZC4t'
};
