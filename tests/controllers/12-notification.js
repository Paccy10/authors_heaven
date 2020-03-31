import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import { newArticle } from '../data/article';

chai.use(chaiHttp);
chai.should();

const API_BASE_URL = '/api/v1';

describe('Notification', () => {
    let APIToken;
    let APIToken2;
    let APIToken3;

    before(async () => {
        const response = await chai
            .request(app)
            .post(`${API_BASE_URL}/auth/login`)
            .send({ email: 'test.user3@app.com', password: 'Password12345' });

        const response2 = await chai
            .request(app)
            .post(`${API_BASE_URL}/auth/login`)
            .send({
                email: 'test.articleuser@app.com',
                password: 'Password12345'
            });

        const response3 = await chai
            .request(app)
            .post(`${API_BASE_URL}/auth/login`)
            .send({
                email: 'test.superuser@app.com',
                password: 'Password12345'
            });

        APIToken = `Bearer ${response.body.data.token}`;
        APIToken2 = `Bearer ${response2.body.data.token}`;
        APIToken3 = `Bearer ${response3.body.data.token}`;

        await chai
            .request(app)
            .post(`${API_BASE_URL}/users/3/follow`)
            .set('Authorization', APIToken2);
    });

    it('should opt in or out of notifications', done => {
        chai.request(app)
            .post(`${API_BASE_URL}/notifications/subscribe`)
            .set('Authorization', APIToken2)
            .send({ inApp: true, email: true })
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(200);
                res.body.should.have.property('status').eql('success');
                res.body.should.have
                    .property('message')
                    .eql('Notifications settings successfully updated');
                res.body.should.have.property('data');
                res.body.data.should.have.property('user');
                res.body.data.user.allowNotifications.inApp.should.equal(true);
                res.body.data.user.allowNotifications.email.should.equal(true);
                done();
            });
    });

    it('should not opt in or out of notifications if inApp or email are not boolean', done => {
        chai.request(app)
            .post(`${API_BASE_URL}/notifications/subscribe`)
            .set('Authorization', APIToken2)
            .send({ inApp: 'true', email: 'true' })
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(400);
                res.body.should.have.property('status').eql('error');
                res.body.should.have.property('errors');
                res.body.errors[0].msg.should.equal(
                    'inApp property must be a boolean value'
                );
                res.body.errors[1].msg.should.equal(
                    'email property must be a boolean value'
                );
                done();
            });
    });

    it('should notify the users who favorited the article', done => {
        chai.request(app)
            .post(`${API_BASE_URL}/articles/2/like`)
            .set('Authorization', APIToken2)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(200);
                res.body.should.have.property('status').eql('success');
                res.body.should.have
                    .property('message')
                    .eql('Article successfully liked');
                res.body.should.have.property('data');
                res.body.data.should.have.property('vote');
                res.body.data.vote.vote.should.equal(true);
                done();
            });
    });

    it('should notify the followers', done => {
        chai.request(app)
            .post(`${API_BASE_URL}/articles`)
            .set('Authorization', APIToken)
            .set('Content-Type', 'multipart/form-data')
            .field('title', newArticle.title)
            .field('body', newArticle.body)
            .field('tags', newArticle.tags)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(201);
                res.body.should.have.property('status').eql('success');
                res.body.should.have
                    .property('message')
                    .eql('Article successfully created');
                res.body.should.have.property('data');
                res.body.data.should.have.property('article');
                res.body.data.article.title.should.equal(newArticle.title);
                res.body.data.article.tags.should.be.a('array');
                done();
            });
    });

    it('should get all user notifications', done => {
        chai.request(app)
            .get(`${API_BASE_URL}/notifications`)
            .set('Authorization', APIToken)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(200);
                res.body.should.have.property('status').eql('success');
                res.body.should.have.property('data');
                res.body.data.should.have.property('notifications');
                done();
            });
    });

    it('should get one user notification', done => {
        chai.request(app)
            .get(`${API_BASE_URL}/notifications/5`)
            .set('Authorization', APIToken)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(200);
                res.body.should.have.property('status').eql('success');
                res.body.should.have.property('data');
                res.body.data.should.have.property('notification');
                done();
            });
    });

    it('should not get one user notification if he is not the owner', done => {
        chai.request(app)
            .get(`${API_BASE_URL}/notifications/1`)
            .set('Authorization', APIToken)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(404);
                res.body.should.have.property('status').eql('error');
                res.body.should.have.property('errors');
                res.body.errors[0].msg.should.equal('Notification not found');
                done();
            });
    });

    it('should delete all seen notifications', done => {
        chai.request(app)
            .delete(`${API_BASE_URL}/notifications`)
            .set('Authorization', APIToken3)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(200);
                res.body.should.have.property('status').eql('success');
                res.body.should.have
                    .property('message')
                    .eql('All seen notifications successfully deleted');
                done();
            });
    });
});
