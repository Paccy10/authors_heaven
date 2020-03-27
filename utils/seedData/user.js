import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const getUsers = async queryInterface => {
    const roles = await queryInterface.sequelize.query(
        `SELECT id from roles WHERE title=Author;`
    );

    return [
        {
            firstname: 'Pacifique',
            lastname: 'Ndayisenga',
            email: process.env.SUPER_USER_EMAIL,
            password: bcrypt.hashSync(process.env.SUPER_USER_PASSWORD, 10),
            isActivated: true,
            roleId: roles[0][0].id,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ];
};

export default getUsers;
