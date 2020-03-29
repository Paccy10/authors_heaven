import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import { updatedUser } from '../data/user';

chai.use(chaiHttp);
chai.should();

const API_BASE_URL = '/api/v1';

describe('User', () => {
    let authorToken;
    let adminToken;
    before(async () => {
        try {
            const response = await chai
                .request(app)
                .post(`${API_BASE_URL}/auth/login`)
                .send({
                    email: 'test.user@app.com',
                    password: 'Password12345'
                });
            const response2 = await chai
                .request(app)
                .post(`${API_BASE_URL}/auth/login`)
                .send({
                    email: 'test.user3@app.com',
                    password: 'Password12345'
                });
            adminToken = `Bearer ${response.body.data.token}`;
            authorToken = `Bearer ${response2.body.data.token}`;
        } catch (error) {
            console.log(error);
        }
    });

    it('should get all users', done => {
        chai.request(app)
            .get(`${API_BASE_URL}/users`)
            .set('Authorization', adminToken)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(200);
                res.body.should.have.property('status').eql('success');
                res.body.should.have.property('data');
                res.body.data.should.have.property('users');
                res.body.data.should.have.property('metaData');
                done();
            });
    });

    it('should get user profile', done => {
        chai.request(app)
            .get(`${API_BASE_URL}/users/test.user@app.com`)
            .set('Authorization', authorToken)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(200);
                res.body.should.have.property('status').eql('success');
                res.body.should.have.property('data');
                res.body.data.should.have.property('user');
                done();
            });
    });
    it('should not get user profile if the user does not exist', done => {
        chai.request(app)
            .get(`${API_BASE_URL}/users/fdfd`)
            .set('Authorization', authorToken)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(404);
                res.body.should.have.property('status').eql('error');
                res.body.should.have.property('errors');
                res.body.errors[0].msg.should.equal('User not found');
                done();
            });
    });

    it('should get current user profile', done => {
        chai.request(app)
            .get(`${API_BASE_URL}/users/me`)
            .set('Authorization', authorToken)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(200);
                res.body.should.have.property('status').eql('success');
                res.body.should.have.property('data');
                res.body.data.should.have.property('user');
                done();
            });
    });

    it('should update user profile', done => {
        chai.request(app)
            .put(`${API_BASE_URL}/users/me`)
            .set('Authorization', authorToken)
            .set('Content-Type', 'multipart/form-data')
            .field('firstname', updatedUser.firstname)
            .field('lastname', updatedUser.lastname)
            .field('bio', updatedUser.bio)
            .attach('image', 'tests/data/img/article-image.png')
            .end((error, res) => {
                if (error) {
                    done(error);
                }
                res.should.status(200);
                res.body.should.have.property('status').eql('success');
                res.body.should.have
                    .property('message')
                    .eql('User profile successfully updated');
                res.body.should.have.property('data');
                done();
            });
    }).timeout(15000);
});
