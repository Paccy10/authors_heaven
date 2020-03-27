import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import getRoles from '../utils/seedData/role';

dotenv.config();

const userSeeder = {
    up: async queryInterface => {
        const roles = getRoles();
        await queryInterface.bulkInsert('roles', roles);
        const rolesRows = await queryInterface.sequelize.query(
            `SELECT id from roles WHERE title = ?;`,
            {
                replacements: ['Super Admin']
            }
        );

        return queryInterface.bulkInsert('users', [
            {
                firstname: 'Pacifique',
                lastname: 'Ndayisenga',
                email: process.env.SUPER_USER_EMAIL,
                password: bcrypt.hashSync(process.env.SUPER_USER_PASSWORD, 10),
                isActivated: true,
                roleId: rolesRows[0][0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]);
    },

    down: async queryInterface => {
        await queryInterface.bulkDelete('users', null, {});
        await queryInterface.bulkDelete('roles', null, {});
    }
};

export default userSeeder;
