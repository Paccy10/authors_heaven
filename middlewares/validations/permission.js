import models from '../../models';

const { permission: Permission } = models;

export const checkPermissionTypeExist = async (req, res, next) => {
    let permission;
    if (req.method === 'POST') {
        permission = await Permission.findOne({
            where: { type: req.body.type }
        });
    }
    if (req.method === 'PUT') {
        const permission2 = await Permission.findOne({
            where: { type: req.body.type }
        });
        if (permission2)
            permission =
                permission2.id !== parseInt(req.params.permissionId, 10)
                    ? permission2
                    : null;
    }
    if (permission) {
        return res.status(409).json({
            status: 'error',
            errors: [{ msg: 'Permission type already exists' }]
        });
    }
    next();
};

export const checkPermission = async (req, res, next) => {
    const permission = await Permission.findByPk(req.params.permissionId);
    if (!permission) {
        return res.status(404).json({
            status: 'error',
            errors: [{ msg: 'Permission not found' }]
        });
    }
    next();
};
