import models from '../../models';

const { following: Following, user: User } = models;

export const checkFollowee = async (req, res, next) => {
    const user = await User.findOne({
        where: { id: req.params.followeeId, isActivated: true }
    });
    if (!user) {
        return res.status(404).json({
            status: 'error',
            errors: [{ msg: 'Followee not found' }]
        });
    }
    next();
};

export const checkFollowing = async (req, res, next) => {
    if (req.user.id === parseInt(req.params.followeeId, 10)) {
        return res.status(400).json({
            status: 'error',
            errors: [{ msg: 'Sorry, you can not follow yourself' }]
        });
    }
    const follower = await Following.findOne({
        where: {
            followerId: req.user.id,
            followeeId: req.params.followeeId
        }
    });
    if (follower) {
        return res.status(409).json({
            status: 'error',
            errors: [{ msg: 'Sorry, you have already followed this user' }]
        });
    }
    next();
};
