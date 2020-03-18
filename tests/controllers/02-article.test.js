import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import { newArticle, updatedArticle, newUser } from '../data/article';
import models from '../../models';

chai.use(chaiHttp);
chai.should();

const API_BASE_URL = '/api/v1';
const { user: User } = models;

describe('Article', () => {
    let APIToken;
    let APIToken2;
    let jwt;
    let articleSlug;

    before(async () => {
        await User.create(newUser);
        const response = await chai
            .request(app)
            .post(`${API_BASE_URL}/auth/login`)
            .send({ email: 'test.user@app.com', password: 'Password12345' });
        const response2 = await chai
            .request(app)
            .post(`${API_BASE_URL}/auth/login`)
            .send({
                email: 'test.articleuser@app.com',
                password: 'Password12345'
            });
        jwt = response.body.data.token;
        APIToken = `Bearer ${jwt}`;
        APIToken2 = `Bearer ${response2.body.data.token}`;
    }, 10000);

    it('should create a new article', done => {
        chai.request(app)
            .post(`${API_BASE_URL}/articles`)
            .set('Authorization', APIToken)
            .set('Content-Type', 'multipart/form-data')
            .field('title', newArticle.title)
            .field('body', newArticle.body)
            .field('tags', newArticle.tags)
            .attach('image', 'tests/data/img/article-image.png')
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                articleSlug = res.body.data.article.slug;
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
    }).timeout(10000);

    it('should not create an article with an unsupported image format', done => {
        chai.request(app)
            .post(`${API_BASE_URL}/articles`)
            .set('Authorization', APIToken)
            .set('Content-Type', 'multipart/form-data')
            .field('title', newArticle.title)
            .field('body', newArticle.body)
            .field('tags', newArticle.tags)
            .attach('image', 'tests/data/article.js')
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(400);
                res.body.should.have.property('status').eql('error');
                res.body.should.have.property('errors');
                res.body.errors[0].msg.should.equal('Unsupported file format');
                done();
            });
    });

    it('should not create an article without a token', done => {
        chai.request(app)
            .post(`${API_BASE_URL}/articles`)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(401);
                res.body.should.have.property('status').eql('error');
                res.body.should.have.property('errors');
                res.body.errors[0].msg.should.equal(
                    'Header does not contain an authorization token'
                );
                done();
            });
    });

    it('should not create an article with token without Bearer word', done => {
        chai.request(app)
            .post(`${API_BASE_URL}/articles`)
            .set('Authorization', jwt)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(401);
                res.body.should.have.property('status').eql('error');
                res.body.should.have.property('errors');
                res.body.errors[0].msg.should.equal(
                    "The token should begin with the word 'Bearer'"
                );
                done();
            });
    });

    it('should not create an article with token without the jwt', done => {
        chai.request(app)
            .post(`${API_BASE_URL}/articles`)
            .set('Authorization', 'Bearer ')
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(401);
                res.body.should.have.property('status').eql('error');
                res.body.should.have.property('errors');
                res.body.errors[0].msg.should.equal(
                    'The token does not contain a jwt'
                );
                done();
            });
    });

    it('should not create an article with token without the good jwt', done => {
        chai.request(app)
            .post(`${API_BASE_URL}/articles`)
            .set('Authorization', 'Bearer sdfdf')
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(401);
                res.body.should.have.property('status').eql('error');
                res.body.should.have.property('errors');
                res.body.errors[0].msg.should.equal('jwt malformed');
                done();
            });
    });

    it('should get all articles', done => {
        chai.request(app)
            .get(`${API_BASE_URL}/articles`)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(200);
                res.body.should.have.property('status').eql('success');
                res.body.should.have.property('data');
                res.body.data.should.have.property('articles');
                res.body.data.should.have.property('metaData');
                done();
            });
    });

    it('should get one article', done => {
        chai.request(app)
            .get(`${API_BASE_URL}/articles/${articleSlug}`)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(200);
                res.body.should.have.property('status').eql('success');
                res.body.should.have.property('data');
                res.body.data.should.have.property('article');
                done();
            });
    });
    it('should not get article if it does not exist', done => {
        chai.request(app)
            .get(`${API_BASE_URL}/articles/fdfd`)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(404);
                res.body.should.have.property('status').eql('error');
                res.body.should.have.property('errors');
                res.body.errors[0].msg.should.equal('Article not found');
                done();
            });
    });

    it('should update an article', done => {
        chai.request(app)
            .put(`${API_BASE_URL}/articles/1`)
            .set('Authorization', APIToken)
            .set('Content-Type', 'multipart/form-data')
            .field('title', updatedArticle.title)
            .field('body', updatedArticle.body)
            .field('tags', updatedArticle.tags)
            .attach('image', 'tests/data/img/article-image.png')
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(200);
                res.body.should.have.property('status').eql('success');
                res.body.should.have
                    .property('message')
                    .eql('Article successfully updated');
                res.body.should.have.property('data');
                res.body.data.should.have.property('article');
                res.body.data.article.title.should.equal(updatedArticle.title);
                res.body.data.article.tags.should.be.a('array');
                done();
            });
    }).timeout(15000);

    it('should not update an article with an unsupported image format', done => {
        chai.request(app)
            .put(`${API_BASE_URL}/articles/1`)
            .set('Authorization', APIToken)
            .set('Content-Type', 'multipart/form-data')
            .field('title', updatedArticle.title)
            .field('body', updatedArticle.body)
            .field('tags', updatedArticle.tags)
            .attach('image', 'tests/data/article.js')
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(400);
                res.body.should.have.property('status').eql('error');
                res.body.should.have.property('errors');
                res.body.errors[0].msg.should.equal('Unsupported file format');
                done();
            });
    });

    it('should not update an article with an unexisting id', done => {
        chai.request(app)
            .put(`${API_BASE_URL}/articles/10`)
            .set('Authorization', APIToken)
            .set('Content-Type', 'multipart/form-data')
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(404);
                res.body.should.have.property('status').eql('error');
                res.body.should.have.property('errors');
                res.body.errors[0].msg.should.equal('Article not found');
                done();
            });
    });
    it('should not update an article if your are not the owner', done => {
        chai.request(app)
            .put(`${API_BASE_URL}/articles/1`)
            .set('Authorization', APIToken2)
            .set('Content-Type', 'multipart/form-data')
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(403);
                res.body.should.have.property('status').eql('error');
                res.body.should.have.property('errors');
                res.body.errors[0].msg.should.equal(
                    'Permission denied. You can not edit an article that is not yours'
                );
                done();
            });
    });
    it('should delete an article', done => {
        chai.request(app)
            .delete(`${API_BASE_URL}/articles/1`)
            .set('Authorization', APIToken)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(200);
                res.body.should.have.property('status').eql('success');
                res.body.should.have
                    .property('message')
                    .eql('Article successfully deleted');
                done();
            });
    }).timeout(10000);
});
