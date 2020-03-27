import models from '../models';

const { permission: Permission } = models;

class PermissionController {
    async create(req, res) {
        const newPermission = {
            type: req.body.type,
            description: req.body.description
        };

        const permission = await Permission.create(newPermission);
        return res.status(201).json({
            status: 'success',
            message: 'Permission successfully created',
            data: { permission }
        });
    }

    async getAll(req, res) {
        const permissions = await Permission.findAll();
        return res.status(200).json({
            status: 'success',
            message: 'Permissions successfully fetched',
            data: { permissions }
        });
    }

    async update(req, res) {
        const newPermission = {
            type: req.body.type,
            description: req.body.description
        };

        const updateResponse = await Permission.update(newPermission, {
            where: { id: req.params.permissionId },
            returning: true
        });

        return res.status(200).json({
            status: 'success',
            message: 'Permission successfully updated',
            data: { permission: updateResponse[1][0] }
        });
    }

    async delete(req, res) {
        await Permission.destroy({ where: { id: req.params.permissionId } });
        return res.status(200).json({
            status: 'success',
            message: 'Permission successfully deleted'
        });
    }
}

export default PermissionController;
