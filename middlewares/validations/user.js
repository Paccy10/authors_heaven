/* eslint-disable no-plusplus */
import models from '../../models';

const { user: User, role: Role } = models;

export const checkEmail = async (req, res, next) => {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (user) {
        return res.status(409).json({
            status: 'error',
            errors: [
                {
                    value: req.body.email,
                    msg: 'Email already exists',
                    param: 'email',
                    location: 'body'
                }
            ]
        });
    }
    next();
};

export const checkUserRole = roleTitle => {
    return async (req, res, next) => {
        const { roleId } = req.user;
        const role = await Role.findByPk(roleId);
        if (
            role &&
            (role.title === roleTitle || role.title === 'Super Admin')
        ) {
            return next();
        }
        res.status(403).json({
            status: 'error',
            errors: [
                {
                    msg:
                        'Permission denied. You are not allowed to perform this action.'
                }
            ]
        });
    };
};

// export const checkPermission = permissionType => {
//     return async (req, res, next) => {
//         const { roleId } = req.user;
//         const role = await Role.findByPk(roleId, {
//             include: [{ model: Permission }]
//         });
//         if (role) {
//             let isPermissionFound = false;
//             const { permissions } = role;
//             for (let i = 0; i < permissions.length; i++) {
//                 if (permissions[i].type === permissionType)
//                     isPermissionFound = true;
//             }
//             if (!isPermissionFound)
//                 return res.status(403).json({
//                     status: 'error',
//                     errors: [
//                         {
//                             msg:
//                                 'Permission denied. You are not allowed to perform this action.'
//                         }
//                     ]
//                 });
//         }
//         next();
//     };
// };
