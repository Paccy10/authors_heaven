import models from '../../models';

const {
    comment: Comment,
    vote: Vote,
    user: User,
    following: Following
} = models;

export const getFavoritedUsers = async articleId => {
    const comments = await Comment.findAll({
        where: { articleId },
        attributes: ['articleId'],
        include: [
            {
                model: User,
                as: 'user',
                attributes: ['id', 'firstname', 'email', 'allowNotifications']
            }
        ]
    });
    const votes = await Vote.findAll({
        where: { articleId },
        attributes: ['articleId'],
        include: [
            {
                model: User,
                attributes: ['id', 'firstname', 'email', 'allowNotifications']
            }
        ]
    });
    return [...comments, ...votes];
};

export const getFollowers = async userId => {
    const followers = await Following.findAll({
        where: { followeeId: userId },
        attributes: ['followerId'],
        include: [
            {
                model: User,
                as: 'follower',
                attributes: ['id', 'firstname', 'email', 'allowNotifications']
            }
        ]
    });
    return followers;
};
