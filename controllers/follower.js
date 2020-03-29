import models from '../models';

const { following: Following, user: User } = models;

class FollowerController {
    async follow(req, res) {
        const newFollower = {
            followerId: req.user.id,
            followeeId: req.params.followeeId
        };
        const follower = await Following.create(newFollower);
        return res.status(201).json({
            status: 'success',
            message: 'User successfully followed',
            data: { follower }
        });
    }

    async unfollow(req, res) {
        const follower = await Following.findOne({
            where: {
                followerId: req.user.id,
                followeeId: req.params.followeeId
            }
        });
        if (!follower) {
            return res.status(400).json({
                status: 'error',
                errors: [
                    { msg: 'Sorry, you are not the follower of this user' }
                ]
            });
        }
        await Following.destroy({
            where: {
                followerId: req.user.id,
                followeeId: req.params.followeeId
            }
        });
        return res.status(200).json({
            status: 'success',
            message: 'User successfully unfollowed'
        });
    }

    async getFollowers(req, res) {
        const followers = await Following.findAll({
            where: { followeeId: req.user.id },
            attributes: ['followerId'],
            include: [
                {
                    model: User,
                    as: 'follower',
                    attributes: ['firstname', 'lastname', 'image', 'bio']
                }
            ]
        });
        return res.status(200).json({
            status: 'success',
            message: 'Followers successfully fetched',
            data: { followers }
        });
    }

    async getFollowees(req, res) {
        const followees = await Following.findAll({
            where: { followerId: req.user.id },
            attributes: ['followeeId'],
            include: [
                {
                    model: User,
                    as: 'followee',
                    attributes: ['firstname', 'lastname', 'image', 'bio']
                }
            ]
        });
        return res.status(200).json({
            status: 'success',
            message: 'Followees successfully fetched',
            data: { followees }
        });
    }
}

export default FollowerController;
