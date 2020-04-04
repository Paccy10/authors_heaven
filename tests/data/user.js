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
        'ya29.a0Ae4lvC3rVUmZsocMRcBo0yWV8EWHtomg5c2vSwYIGWvXTRYXMdjbhOwRaCjaev6fVaON30rFiARYf0qOZtxvZS-nqpuNDtXZvyk8ug5Bg_RelHYcosa_xwQpCnZ-OHhmCyQ7dqwxHpj2K6zYPoNqVZmaPuVFaYM7Dt0'
};

export const facebookUser = {
    access_token:
        'EAADjRsgzs0EBAMddw5AWrgOrMZA8ENBsyiNqc1qYYHarP1JTyNCRVvsNCpTTvNURYGz0STZADsMbp7eHAaYDwdZCugmmX3uHFLu9HOTvLmX4Ahpp1cp3YJAnpcRQIqPtJHfZCUXZAhoZBHsbCATX7dloVT8uFI5kOM2kMB1lEgn06Db1JOESMhzutVglWfUqjPXFd0Wl4zI05CVmBeZAYmZALcThm51gzrt87Yf0cllyAgZDZD'
};
