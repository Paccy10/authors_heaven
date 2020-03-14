import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import {
    newUser,
    newInvalidUser,
    invalidUserWithLowercasePassword,
    invalidUserWithUppercasePassword,
    invalidUserWithoutDigit
} from '../data/user';

chai.use(chaiHttp);
chai.should();

const API_BASE_URL = '/api/v1';

describe('User', () => {
    let token;

    it('should create a new user and send a confirmation link', done => {
        chai.request(app)
            .post(`${API_BASE_URL}/auth/signup`)
            .send(newUser)
            .end((error, res) => {
                if (error) {
                    done(error);
                }

                token = res.body.data.token;

                res.should.status(201);
                res.body.should.have.property('status').eql('success');
                res.body.should.have.property('data');
                res.body.data.should.have.property('user');
                res.body.data.should.have.property('token');
                res.body.data.user.email.should.equal(newUser.email);
                res.body.data.should.have.property('emailResponse');
                res.body.data.emailResponse.should.equal(
                    'Account activation link sent'
                );
                done();
            });
    }).timeout(15000);

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
            .get(`${API_BASE_URL}/auth/activate/${token}`)
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
            .get(`${API_BASE_URL}/auth/activate/${token}`)
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
});
