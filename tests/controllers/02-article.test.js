import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import { newArticle } from '../data/article';
import models from '../../models';

chai.use(chaiHttp);
chai.should();

const API_BASE_URL = '/api/v1';
const { article: Article } = models;

describe('Article', () => {
    let APIToken;
    let jwt;
    let articleSlug;

    before(async () => {
        const response = await chai
            .request(app)
            .post(`${API_BASE_URL}/auth/login`)
            .send({ email: 'test.user@app.com', password: 'Password12345' });
        jwt = response.body.data.token;
        APIToken = `Bearer ${jwt}`;
    });

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
});
