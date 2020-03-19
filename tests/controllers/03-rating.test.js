import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import { newArticle } from '../data/article';

chai.use(chaiHttp);
chai.should();

const API_BASE_URL = '/api/v1';

describe('Rating', () => {
    let APIToken;

    before(async () => {
        const response = await chai
            .request(app)
            .post(`${API_BASE_URL}/auth/login`)
            .send({ email: 'test.user@app.com', password: 'Password12345' });

        APIToken = `Bearer ${response.body.data.token}`;

        await chai
            .request(app)
            .post(`${API_BASE_URL}/articles`)
            .set('Authorization', APIToken)
            .set('Content-Type', 'multipart/form-data')
            .field('title', newArticle.title)
            .field('body', newArticle.body)
            .field('tags', newArticle.tags);
    });

    it('should create a rating for an article', done => {
        chai.request(app)
            .post(`${API_BASE_URL}/articles/2/ratings`)
            .set('Authorization', APIToken)
            .send({ rating: 4 })
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(201);
                res.body.should.have.property('status').eql('success');
                res.body.should.have
                    .property('message')
                    .eql('Rating successfully created');
                res.body.should.have.property('data');
                res.body.data.should.have.property('rating');
                res.body.data.rating.rating.should.equal(4);
                done();
            });
    });

    it('should update a rating for an article', done => {
        chai.request(app)
            .post(`${API_BASE_URL}/articles/2/ratings`)
            .set('Authorization', APIToken)
            .send({ rating: 3 })
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(200);
                res.body.should.have.property('status').eql('success');
                res.body.should.have
                    .property('message')
                    .eql('Rating successfully updated');
                res.body.should.have.property('data');
                res.body.data.should.have.property('rating');
                res.body.data.rating.rating.should.equal(3);
                done();
            });
    });

    it('should get all article ratings', done => {
        chai.request(app)
            .get(`${API_BASE_URL}/articles/2/ratings`)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(200);
                res.body.should.have.property('status').eql('success');
                res.body.should.have.property('data');
                res.body.data.should.have.property('ratings');
                res.body.data.should.have.property('metaData');
                done();
            });
    });
});
