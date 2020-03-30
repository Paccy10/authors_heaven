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
        'ya29.a0Adw1xeVgIwJXGUAFq_u7-gjUkE9tpZ7sx4-NLt1B4NaHWLfgRIqJibPIX3p_lJk8MqNpxC3-DZF97AG4z2efDWXOSL1__KkMvy15SDZiSein9zGh9MkCt4WKA_4uAj-bh25nNfWLP21i5VFGjJAFCHg2TU9Iuhv5Dxw'
};

export const facebookUser = {
    access_token:
        'EAADjRsgzs0EBAAdPZAAZBku70563I91UqeeF25cVNQ2IaGueWyGeW3fzBPWqRpywqaKHLgOmMGMRIKkZCe9DPPcT04uEv3TdmvExIe9183nrMcb7yfjzgHHMD8OUpOnsZB7WYC4FMAtPU8Xi7ySi6JBBrRDFzz8h9XHNZCQY82XvzA4fsRvTpaiZA5UhnAzgf45llzlEQEyP7knl1y7rskrG0xZC6q6Dq3yIIrJa9bzogZDZD'
};
