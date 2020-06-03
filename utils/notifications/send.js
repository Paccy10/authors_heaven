/* eslint-disable array-callback-return */
import { getFavoritedUsers, getFollowers } from './receivers';
import { notification } from '../emails/emailTemplates';
import sendEmail from '../emails/sendEmail';
import models from '../../models';

const { notification: Notification } = models;
const mailOptions = {
    to: '',
    from: `Authors Heaven <${process.env.MAIL_USER}>`,
    subject: 'Notification',
    html: ''
};

export const sendToFavorite = async (article, notifier, body) => {
    let inAppNotifications = [];
    const emails = new Set();
    const receivers = await getFavoritedUsers(article.id);
    if (receivers.length > 0) {
        receivers.map(receiver => {
            const { id, email, allowNotifications } = receiver.user;
            if (id !== notifier.id && allowNotifications.inApp) {
                const inAppNotification = { receiverId: id, body };
                inAppNotifications.push(inAppNotification);
            }
            if (id !== notifier.id && allowNotifications.email) {
                emails.add(email);
            }
        });
        if (inAppNotifications.length > 0) {
            inAppNotifications = Object.values(
                inAppNotifications.reduce(
                    (acc, cur) => Object.assign(acc, { [cur.receiverId]: cur }),
                    {}
                )
            );
            await Notification.bulkCreate(inAppNotifications, {
                returning: true
            });
        }
        if (emails.size > 0) {
            mailOptions.to = [...emails];
            mailOptions.html = notification(body, article.slug);
            await sendEmail(mailOptions);
        }
    }
};

export const sendToFollowers = async (article, notifier) => {
    let inAppNotifications = [];
    const emails = new Set();
    const receivers = await getFollowers(notifier.id);
    const body = `${notifier.firstname} ${notifier.lastname} has created a new article.`;
    if (receivers.length > 0) {
        receivers.map(receiver => {
            const { id, email, allowNotifications } = receiver.follower;
            if (id !== notifier.id && allowNotifications.inApp) {
                const inAppNotification = { receiverId: id, body };
                inAppNotifications.push(inAppNotification);
            }
            if (id !== notifier.id && allowNotifications.email) {
                emails.add(email);
            }
        });
        if (inAppNotifications.length > 0) {
            inAppNotifications = Object.values(
                inAppNotifications.reduce(
                    (acc, cur) => Object.assign(acc, { [cur.receiverId]: cur }),
                    {}
                )
            );
            await Notification.bulkCreate(inAppNotifications, {
                returning: true
            });
        }
        if (emails.size > 0) {
            mailOptions.to = [...emails];
            mailOptions.html = notification(body, article.slug);
            await sendEmail(mailOptions);
        }
    }
};
