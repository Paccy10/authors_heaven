const getRoles = () => {
    return [
        {
            title: 'Super Admin',
            description:
                'App super user that in charge of creating roles, users, etc.',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            title: 'Admin',
            description: 'App administrator user',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            title: 'Author',
            description: 'App administrator user',
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ];
};

export default getRoles;
