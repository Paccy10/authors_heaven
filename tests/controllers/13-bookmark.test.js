import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import models from '../../models';

chai.use(chaiHttp);
chai.should();

const API_BASE_URL = '/api/v1';
const { article: Article } = models;

describe('Bookmark', () => {
    let APIToken;
    let article;

    before(async () => {
        const response = await chai
            .request(app)
            .post(`${API_BASE_URL}/auth/login`)
            .send({ email: 'test.user@app.com', password: 'Password12345' });

        APIToken = `Bearer ${response.body.data.token}`;
        article = await Article.findByPk(2);
    });

    it('should bookmark an article', done => {
        chai.request(app)
            .post(`${API_BASE_URL}/articles/2/bookmark`)
            .set('Authorization', APIToken)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(201);
                res.body.should.have.property('status').eql('success');
                res.body.should.have
                    .property('message')
                    .eql('Article successfully bookmarked');
                res.body.should.have.property('data');
                res.body.data.should.have.property('bookmark');
                done();
            });
    });

    it('should get an article with property hasBookmarked', done => {
        chai.request(app)
            .get(`${API_BASE_URL}/articles/${article.slug}`)
            .set('Authorization', APIToken)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(200);
                res.body.should.have.property('status').eql('success');
                res.body.should.have.property('data');
                res.body.data.should.have.property('article');
                res.body.data.article.should.have
                    .property('hasBookmarked')
                    .eql(true);
                done();
            });
    });

    it('should not bookmark an article twice', done => {
        chai.request(app)
            .post(`${API_BASE_URL}/articles/2/bookmark`)
            .set('Authorization', APIToken)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(409);
                res.body.should.have.property('status').eql('error');
                res.body.should.have.property('errors');
                res.body.errors[0].msg.should.equal(
                    'Sorry, you have already bookmarked this article'
                );
                done();
            });
    });

    it('should unbookmark an article', done => {
        chai.request(app)
            .post(`${API_BASE_URL}/articles/2/unbookmark`)
            .set('Authorization', APIToken)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(200);
                res.body.should.have.property('status').eql('success');
                res.body.should.have
                    .property('message')
                    .eql('Article successfully unbookmarked');
                done();
            });
    });

    it('should not unbookmark article if you have not bookmarked it', done => {
        chai.request(app)
            .post(`${API_BASE_URL}/articles/2/unbookmark`)
            .set('Authorization', APIToken)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(400);
                res.body.should.have.property('status').eql('error');
                res.body.should.have.property('errors');
                res.body.errors[0].msg.should.equal(
                    'Sorry, you have not bookmarked this article'
                );
                done();
            });
    });

    it('should get user bookmarks', done => {
        chai.request(app)
            .get(`${API_BASE_URL}/users/bookmarks`)
            .set('Authorization', APIToken)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(200);
                res.body.should.have.property('status').eql('success');
                res.body.should.have
                    .property('message')
                    .eql('Bookmarked artilces successfully fetched');
                res.body.should.have.property('data');
                res.body.data.should.have.property('bookmarks');
                done();
            });
    });
});
