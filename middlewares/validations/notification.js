import models from '../../models';

const { notification: Notification } = models;

export const checkNotification = async (req, res, next) => {
    const notification = await Notification.findOne({
        where: {
            id: req.params.notificationId,
            receiverId: req.user.id,
            seen: false
        }
    });
    if (!notification) {
        return res.status(404).json({
            status: 'error',
            errors: [{ msg: 'Notification not found' }]
        });
    }
    req.notification = notification;
    next();
};
