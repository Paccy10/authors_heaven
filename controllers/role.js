/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable no-empty */
import models from '../models';

const {
    role: Role,
    rolePermission: RolePermission,
    permission: Permission
} = models;

class RoleController {
    async create(req, res) {
        const newRole = {
            title: req.body.title,
            description: req.body.description
        };

        const role = await Role.create(newRole);
        return res.status(201).json({
            status: 'success',
            message: 'Role successfully created',
            data: { role }
        });
    }

    async getAll(req, res) {
        const roles = await Role.findAll({
            include: [
                {
                    model: Permission,
                    attributes: ['id', 'type', 'description'],
                    through: {
                        attributes: []
                    }
                }
            ]
        });
        return res.status(200).json({
            status: 'success',
            message: 'Roles successfully fetched',
            data: { roles }
        });
    }

    async update(req, res) {
        const newRole = {
            title: req.body.title,
            description: req.body.description
        };

        const updateResponse = await Role.update(newRole, {
            where: { id: req.params.roleId },
            returning: true
        });

        return res.status(200).json({
            status: 'success',
            message: 'Role successfully updated',
            data: { role: updateResponse[1][0] }
        });
    }

    async delete(req, res) {
        await Role.destroy({ where: { id: req.params.roleId } });
        return res.status(200).json({
            status: 'success',
            message: 'Role successfully deleted'
        });
    }

    async assignPermissions(req, res) {
        const { permissions } = req.body;
        for (let i = 0; i < permissions.length; i++) {
            await RolePermission.findOrCreate({
                where: {
                    roleId: req.params.roleId,
                    permissionId: permissions[i]
                }
            });
        }
        return res.status(200).json({
            status: 'success',
            message: 'Permissions successfully assinged'
        });
    }
}

export default RoleController;
