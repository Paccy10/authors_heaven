import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import {
    newUser,
    newUser2,
    newUser3,
    newInvalidUser,
    invalidUserWithLowercasePassword,
    invalidUserWithUppercasePassword,
    invalidUserWithoutDigit,
    loginUser,
    loginUser2,
    updatedUser,
    googleUser,
    facebookUser
} from '../data/user';
import models from '../../models';
import generateToken from '../../utils/generateToken';

chai.use(chaiHttp);
chai.should();

const API_BASE_URL = '/api/v1';
const { user: User } = models;

describe('User', () => {
    const verifyToken = generateToken({ email: 'test.user@app.com' });
    const passwordResetToken = generateToken({ email: 'test.user@app.com' });
    let token;
    before(async () => {
        try {
            await User.create(newUser2);
            await User.create(newUser3);
        } catch (error) {
            console.log(error);
        }
    });

    it('should create a new user and send a confirmation link', done => {
        chai.request(app)
            .post(`${API_BASE_URL}/auth/signup`)
            .send(newUser)
            .end((error, res) => {
                if (error) {
                    done(error);
                }

                res.should.status(201);
                res.body.should.have.property('status').eql('success');
                res.body.should.have.property('data');
                res.body.data.should.have.property('user');
                res.body.data.user.email.should.equal(newUser.email);
                res.body.data.should.have.property('emailResponse');
                res.body.data.emailResponse.should.equal('Email sent');
                done();
            });
    }).timeout(20000);

    it('should not create a new user with invalid data', done => {
        chai.request(app)
            .post(`${API_BASE_URL}/auth/signup`)
            .send(newInvalidUser)
            .end((error, res) => {
                if (error) {
                    done(error);
                }
                res.should.status(400);
                res.body.should.have.property('status').eql('error');
                res.body.should.have.property('errors');
                res.body.errors[0].msg.should.equal('Firstname is required');
                done();
            });
    });

    it('should not create a new user with existed email', done => {
        chai.request(app)
            .post(`${API_BASE_URL}/auth/signup`)
            .send(newUser)
            .end((error, res) => {
                if (error) {
                    done(error);
                }
                res.should.status(409);
                res.body.should.have.property('status').eql('error');
                res.body.should.have.property('errors');
                res.body.errors[0].msg.should.equal('Email already exists');
                done();
            });
    });

    it('should not create a new user with lowercase password', done => {
        chai.request(app)
            .post(`${API_BASE_URL}/auth/signup`)
            .send(invalidUserWithLowercasePassword)
            .end((error, res) => {
                if (error) {
                    done(error);
                }
                res.should.status(400);
                res.body.should.have.property('status').eql('error');
                res.body.should.have.property('errors');
                res.body.errors[0].msg.should.equal(
                    'Password must contain at least one uppercase letter'
                );
                done();
            });
    });

    it('should not create a new user with uppercase password', done => {
        chai.request(app)
            .post(`${API_BASE_URL}/auth/signup`)
            .send(invalidUserWithUppercasePassword)
            .end((error, res) => {
                if (error) {
                    done(error);
                }
                res.should.status(400);
                res.body.should.have.property('status').eql('error');
                res.body.should.have.property('errors');
                res.body.errors[0].msg.should.equal(
                    'Password must contain at least one lowercase letter'
                );
                done();
            });
    });

    it('should not create a new user with password without a number', done => {
        chai.request(app)
            .post(`${API_BASE_URL}/auth/signup`)
            .send(invalidUserWithoutDigit)
            .end((error, res) => {
                if (error) {
                    done(error);
                }
                res.should.status(400);
                res.body.should.have.property('status').eql('error');
                res.body.should.have.property('errors');
                res.body.errors[0].msg.should.equal(
                    'Password must contain letters and numbers'
                );
                done();
            });
    });

    it('should activate user account', done => {
        chai.request(app)
            .get(`${API_BASE_URL}/auth/activate/${verifyToken}`)
            .end((error, res) => {
                if (error) {
                    done(error);
                }
                res.should.status(200);
                res.body.should.have.property('status').eql('success');
                res.body.should.have
                    .property('message')
                    .eql('User account successfully activated');
                res.body.should.have.property('data');
                done();
            });
    });

    it('should not activate user account that is already activated', done => {
        chai.request(app)
            .get(`${API_BASE_URL}/auth/activate/${verifyToken}`)
            .end((error, res) => {
                if (error) {
                    done(error);
                }
                res.should.status(400);
                res.body.should.have.property('status').eql('error');
                res.body.should.have.property('errors');
                res.body.errors[0].msg.should.equal(
                    'User account already activated'
                );
                done();
            });
    });

    it('should not activate user account if the token is invalid', done => {
        chai.request(app)
            .get(`${API_BASE_URL}/auth/activate/token`)
            .end((error, res) => {
                if (error) {
                    done(error);
                }
                res.should.status(400);
                res.body.should.have.property('status').eql('error');
                res.body.should.have.property('errors');
                res.body.errors[0].msg.should.equal('Invalid token');
                done();
            });
    });

    it('should login user', done => {
        chai.request(app)
            .post(`${API_BASE_URL}/auth/login`)
            .send(loginUser)
            .end((error, res) => {
                if (error) {
                    done(error);
                }

                token = `Bearer ${res.body.data.token}`;
                res.should.status(200);
                res.body.should.have.property('status').eql('success');
                res.body.should.have
                    .property('message')
                    .eql('User successfully logged in');
                res.body.should.have.property('data');
                res.body.data.should.have.property('user');
                res.body.data.should.have.property('token');
                res.body.data.user.email.should.equal(loginUser.email);
                done();
            });
    });

    it('should not login a user with incorrect credentials', done => {
        chai.request(app)
            .post(`${API_BASE_URL}/auth/login`)
            .send({ email: 'test', password: 'good' })
            .end((error, res) => {
                if (error) {
                    done(error);
                }

                res.should.status(400);
                res.body.should.have.property('status').eql('error');
                res.body.should.have.property('errors');
                res.body.errors[0].msg.should.equal(
                    'Incorrect username or password'
                );
                done();
            });
    });

    it('should not login a user if no credentials provided', done => {
        chai.request(app)
            .post(`${API_BASE_URL}/auth/login`)
            .send({})
            .end((error, res) => {
                if (error) {
                    done(error);
                }

                res.should.status(400);
                res.body.should.have.property('status').eql('error');
                res.body.should.have.property('errors');
                res.body.errors[0].msg.should.equal('Email is required');
                res.body.errors[1].msg.should.equal('Password is required');
                done();
            });
    });

    it('should not login a user that is not activated', done => {
        chai.request(app)
            .post(`${API_BASE_URL}/auth/login`)
            .send(loginUser2)
            .end((error, res) => {
                if (error) {
                    done(error);
                }

                res.should.status(400);
                res.body.should.have.property('status').eql('error');
                res.body.should.have.property('errors');
                res.body.errors[0].msg.should.equal(
                    'Please activate your account'
                );
                done();
            });
    });

    it('should send password reset link', done => {
        chai.request(app)
            .post(`${API_BASE_URL}/auth/reset-password`)
            .send({ email: 'test.user@app.com' })
            .end((error, res) => {
                if (error) {
                    done(error);
                }

                res.should.status(200);
                res.body.should.have.property('status').eql('success');
                res.body.should.have
                    .property('message')
                    .eql(
                        'Password reset link successfully sent. Please check your email to continue'
                    );
                done();
            });
    }).timeout(15000);

    it('should not send password reset linkif user does not exist ', done => {
        chai.request(app)
            .post(`${API_BASE_URL}/auth/reset-password`)
            .send({ email: 'test.user100@app.com' })
            .end((error, res) => {
                if (error) {
                    done(error);
                }

                res.should.status(404);
                res.body.should.have.property('status').eql('error');
                res.body.should.have.property('errors');
                res.body.errors[0].msg.should.equal('User not found');
                done();
            });
    });

    it('should update user password', done => {
        chai.request(app)
            .patch(`${API_BASE_URL}/auth/reset-password`)
            .send({ token: passwordResetToken, password: 'Password12345' })
            .end((error, res) => {
                if (error) {
                    done(error);
                }
                res.should.status(200);
                res.body.should.have.property('status').eql('success');
                res.body.should.have
                    .property('message')
                    .eql('Password successfully changed');
                done();
            });
    });

    it('should not update user password with invalid token', done => {
        chai.request(app)
            .patch(`${API_BASE_URL}/auth/reset-password`)
            .send({ token: 'fdfdfd', password: 'Password12345' })
            .end((error, res) => {
                if (error) {
                    done(error);
                }
                res.should.status(400);
                res.body.should.have.property('status').eql('error');
                res.body.should.have.property('errors');
                res.body.errors[0].msg.should.equal('Invalid token');
                done();
            });
    });

    it('should get all users', done => {
        chai.request(app)
            .get(`${API_BASE_URL}/auth`)
            .set('Authorization', token)
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
            .get(`${API_BASE_URL}/auth/profile/test.user@app.com`)
            .set('Authorization', token)
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
            .get(`${API_BASE_URL}/auth/profile/fdfd`)
            .set('Authorization', token)
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
            .get(`${API_BASE_URL}/auth/profile`)
            .set('Authorization', token)
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
            .put(`${API_BASE_URL}/auth/profile`)
            .set('Authorization', token)
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

    it('should login a user via google', done => {
        chai.request(app)
            .post(`${API_BASE_URL}/auth/login/google`)
            .send(googleUser)
            .end((error, res) => {
                if (error) {
                    done(error);
                }
                res.should.status(200);
                res.body.should.have.property('status').eql('success');
                res.body.should.have
                    .property('message')
                    .eql('User successfully logged in');
                res.body.should.have.property('data');
                res.body.data.should.have.property('user');
                res.body.data.should.have.property('token');
                done();
            });
    }).timeout(15000);

    it('should login a user via facebook', done => {
        chai.request(app)
            .post(`${API_BASE_URL}/auth/login/facebook`)
            .send(facebookUser)
            .end((error, res) => {
                if (error) {
                    done(error);
                }
                res.should.status(200);
                res.body.should.have.property('status').eql('success');
                res.body.should.have
                    .property('message')
                    .eql('User successfully logged in');
                res.body.should.have.property('data');
                res.body.data.should.have.property('user');
                res.body.data.should.have.property('token');
                done();
            });
    }).timeout(15000);
});
