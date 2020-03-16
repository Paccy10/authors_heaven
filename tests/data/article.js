import bcrypt from 'bcryptjs';

export const newUser = {
    firstname: 'Test',
    lastname: 'User',
    email: 'test.user@app.com',
    password: bcrypt.hashSync('Password12345', 10),
    isActivated: true
};

export const newArticle = {
    title: 'Test article',
    body: 'Test article body',
    tags: 'test,article',
    author: 1
};
