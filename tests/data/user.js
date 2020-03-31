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
        'ya29.a0Adw1xeXobRTqpKcIlJ3DIPKN9lRTKsaUobrV37EqOvXjOOvVbWl4A6JQiYnaUF3lYC6BLZ-zHd7wCX_Cr_HpkZKNfPjmcdD6Akr6Igad1Mf9pZ3PdSEjno-K8FvPZ_PAZr-rqQ7dIiKq2oOf71YY3IcDFBJ3Tt2rR14'
};

export const facebookUser = {
    access_token:
        'EAADjRsgzs0EBABiPLuqyvwpWkrovZCsvgC6V6B5pmZB5bhZBN3BHZAKb7joo1nLmku5rJGeBMOPjIZCpxNUR0YSfp2ZAmCnZBmp4m3UyjzZCaP8Je8tTrwSOldMHrtkpXUy2o670LdYHlGyjxNUS6Jd40FzZAYIUKv3w6CSoEwHvY84aVXYZAo6R02J1wjLb8qM7PwEj2kFFZBk4ds5MZCYCeWRQs3S8uVCjMfEslvdNhVCHHAZDZD'
};
