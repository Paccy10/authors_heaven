import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

chai.use(chaiHttp);
chai.should();

const API_BASE_URL = '/api/v1';

describe('Follower', () => {
    let APIToken;

    before(async () => {
        const response = await chai
            .request(app)
            .post(`${API_BASE_URL}/auth/login`)
            .send({ email: 'test.user@app.com', password: 'Password12345' });

        APIToken = `Bearer ${response.body.data.token}`;
    });

    it('should follow user', done => {
        chai.request(app)
            .post(`${API_BASE_URL}/users/1/follow`)
            .set('Authorization', APIToken)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(201);
                res.body.should.have.property('status').eql('success');
                res.body.should.have
                    .property('message')
                    .eql('User successfully followed');
                res.body.should.have.property('data');
                res.body.data.should.have.property('follower');
                done();
            });
    });

    it('should not follow user if user does not exist', done => {
        chai.request(app)
            .post(`${API_BASE_URL}/users/100/follow`)
            .set('Authorization', APIToken)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(404);
                res.body.should.have.property('status').eql('error');
                res.body.should.have.property('errors');
                res.body.errors[0].msg.should.equal('Followee not found');
                done();
            });
    });

    it('should not follow user if the follower is the followee', done => {
        chai.request(app)
            .post(`${API_BASE_URL}/users/4/follow`)
            .set('Authorization', APIToken)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(400);
                res.body.should.have.property('status').eql('error');
                res.body.should.have.property('errors');
                res.body.errors[0].msg.should.equal(
                    'Sorry, you can not follow yourself'
                );
                done();
            });
    });

    it('should not follow user twice', done => {
        chai.request(app)
            .post(`${API_BASE_URL}/users/1/follow`)
            .set('Authorization', APIToken)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(409);
                res.body.should.have.property('status').eql('error');
                res.body.should.have.property('errors');
                res.body.errors[0].msg.should.equal(
                    'Sorry, you have already followed this user'
                );
                done();
            });
    });

    it('should unfollow user', done => {
        chai.request(app)
            .post(`${API_BASE_URL}/users/1/unfollow`)
            .set('Authorization', APIToken)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(200);
                res.body.should.have.property('status').eql('success');
                res.body.should.have
                    .property('message')
                    .eql('User successfully unfollowed');
                done();
            });
    });

    it('should not unfollow user if you have not followed him', done => {
        chai.request(app)
            .post(`${API_BASE_URL}/users/1/unfollow`)
            .set('Authorization', APIToken)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(400);
                res.body.should.have.property('status').eql('error');
                res.body.should.have.property('errors');
                res.body.errors[0].msg.should.equal(
                    'Sorry, you are not the follower of this user'
                );
                done();
            });
    });

    it('should get user followers', done => {
        chai.request(app)
            .get(`${API_BASE_URL}/users/followers`)
            .set('Authorization', APIToken)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(200);
                res.body.should.have.property('status').eql('success');
                res.body.should.have
                    .property('message')
                    .eql('Followers successfully fetched');
                res.body.should.have.property('data');
                res.body.data.should.have.property('followers');
                done();
            });
    });

    it('should get user followees', done => {
        chai.request(app)
            .get(`${API_BASE_URL}/users/followees`)
            .set('Authorization', APIToken)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(200);
                res.body.should.have.property('status').eql('success');
                res.body.should.have
                    .property('message')
                    .eql('Followees successfully fetched');
                res.body.should.have.property('data');
                res.body.data.should.have.property('followees');
                done();
            });
    });
});
