/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
import models from '../../models';

const { role: Role, permission: Permission } = models;

export const checkRoleTitleExist = async (req, res, next) => {
    let role;
    if (req.method === 'POST') {
        role = await Role.findOne({
            where: { title: req.body.title }
        });
    }
    if (req.method === 'PUT') {
        const role2 = await Role.findOne({
            where: { title: req.body.title }
        });
        if (role2)
            role = role2.id !== parseInt(req.params.roleId, 10) ? role2 : null;
    }
    if (role) {
        return res.status(409).json({
            status: 'error',
            errors: [{ msg: 'Role title already exists' }]
        });
    }
    next();
};

export const checkRole = async (req, res, next) => {
    const role = await Role.findByPk(req.params.roleId);
    if (!role) {
        return res.status(404).json({
            status: 'error',
            errors: [{ msg: 'Role not found' }]
        });
    }
    next();
};

export const checkPermissions = async (req, res, next) => {
    const { permissions } = req.body;
    for (let i = 0; i < permissions.length; i++) {
        const permission = await Permission.findByPk(permissions[i]);
        if (!permission) {
            return res.status(404).json({
                status: 'error',
                errors: [{ value: permissions[i], msg: 'Permission not found' }]
            });
        }
    }
    next();
};
