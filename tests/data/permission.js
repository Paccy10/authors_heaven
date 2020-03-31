import bcrypt from 'bcryptjs';

export const newUser = {
    firstname: 'Test',
    lastname: 'Superuser',
    email: 'test.superuser@app.com',
    password: bcrypt.hashSync('Password12345', 10),
    isActivated: true,
    roleId: 1,
    allowNotifications: {
        inApp: true,
        email: true
    }
};

export const newPermission = {
    type: 'create:article',
    description: 'create an article'
};

export const newPermission2 = {
    type: 'view:article',
    description: 'view an article'
};
