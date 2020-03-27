import bcrypt from 'bcryptjs';

export const newUser = {
    firstname: 'Test',
    lastname: 'User',
    email: 'test.articleuser@app.com',
    password: bcrypt.hashSync('Password12345', 10),
    isActivated: true,
    roleId: 2
};

export const newArticle = {
    title: 'Test article',
    body: 'Test article body',
    tags: 'test,article'
};

export const updatedArticle = {
    title: 'Test updated article',
    body: 'Test updated article body',
    tags: 'test,article'
};
