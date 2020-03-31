import models from '../models';

const { user: User, notification: Notification } = models;

class NotificationController {
    async subscribe(req, res) {
        const allowNotifications = {
            inApp: req.body.inApp,
            email: req.body.email
        };
        await User.update(
            { allowNotifications },
            { where: { id: req.user.id } }
        );
        const user = await User.findOne({
            where: { id: req.user.id },
            attributes: ['firstname', 'lastname', 'allowNotifications']
        });
        return res.status(200).json({
            status: 'success',
            message: 'Notifications settings successfully updated',
            data: { user }
        });
    }

    async getAll(req, res) {
        const notifications = await Notification.findAll({
            where: { receiverId: req.user.id, seen: false },
            order: [['id', 'DESC']]
        });
        return res.status(200).json({
            status: 'success',
            message: 'Notifications successfully fetched',
            data: { notifications }
        });
    }

    async getOne(req, res) {
        const { notification } = req;
        const updatedNotification = await Notification.update(
            { seen: true },
            { where: { id: notification.id }, returning: true }
        );
        return res.status(200).json({
            status: 'success',
            message: 'Notification successfully fetched',
            data: { notification: updatedNotification[1][0] }
        });
    }

    async deleteAllSeen(req, res) {
        await Notification.destroy({ where: { seen: true } });
        return res.status(200).json({
            status: 'success',
            message: 'All seen notifications successfully deleted'
        });
    }
}

export default NotificationController;
