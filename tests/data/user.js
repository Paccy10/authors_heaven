export const newUser = {
    firstname: 'Test',
    lastname: 'User',
    email: 'test.user@app.com',
    password: 'Password12345'
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
