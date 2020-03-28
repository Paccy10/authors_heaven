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
        'ya29.a0Adw1xeXLRr6uNRUilPKHJ4c3IeGZpketc5SaU3QjlY3OtLYactVI-fqZR3R02ZZN5uEK5VyX-VpclROI3Bn54W1rxyow2DWU1M-z0nOVgxDM6exsXjc3nCkdgJKj6WXOWW9kusjUIv3XJXLbjOhxytr3ut5gAfaszAA'
};

export const facebookUser = {
    access_token:
        'EAADjRsgzs0EBAPylmlGSasD5faO6jo3vaahJ8JDnRhUkKlZBsZAk2zhZCNWJ4Psk2r3f8D55nt2J3ZCUZCuwVU4ZCb3oFL95zBZCNK5L2p8gi5YnribZBqj7ZAH0iPtsZA0tVB1F8W38cYxkRnzhZAWfG4BaPZChfh7UoSLoxAMf6PkGRWBCK7iW84GDVtctiRwPgYksP6HQkdb3cyZCV4ZCGhE8K2etZCoQr7uZBGkJckOQuKhuxwZDZD'
};
