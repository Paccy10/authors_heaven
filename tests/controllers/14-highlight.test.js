import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

chai.use(chaiHttp);
chai.should();

const API_BASE_URL = '/api/v1';

describe('Highlight', () => {
    let APIToken;

    before(async () => {
        const response = await chai
            .request(app)
            .post(`${API_BASE_URL}/auth/login`)
            .send({ email: 'test.user@app.com', password: 'Password12345' });

        APIToken = `Bearer ${response.body.data.token}`;
    });

    it('should highlight a text in an article', done => {
        chai.request(app)
            .post(`${API_BASE_URL}/articles/2/highlights`)
            .set('Authorization', APIToken)
            .send({ indexStart: 0, indexEnd: 5, comment: 'Good' })
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(201);
                res.body.should.have.property('status').eql('success');
                res.body.should.have
                    .property('message')
                    .eql('Article text successfully highlighted');
                res.body.should.have.property('data');
                res.body.data.should.have.property('highlight');
                done();
            });
    });

    it('should not highlight the same text in an article', done => {
        chai.request(app)
            .post(`${API_BASE_URL}/articles/2/highlights`)
            .set('Authorization', APIToken)
            .send({ indexStart: 0, indexEnd: 5, comment: 'Good' })
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(409);
                res.body.should.have.property('status').eql('error');
                res.body.should.have.property('errors');
                res.body.errors[0].msg.should.equal(
                    'Sorry, you have already higlighted this text'
                );
                done();
            });
    });

    it('should not highlight if the indeces are not correct', done => {
        chai.request(app)
            .post(`${API_BASE_URL}/articles/2/highlights`)
            .set('Authorization', APIToken)
            .send({ indexStart: 5, indexEnd: 0, comment: 'Good' })
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(400);
                res.body.should.have.property('status').eql('error');
                res.body.should.have.property('errors');
                res.body.errors[0].msg.should.equal(
                    "'indexEnd' must be greater than 'indexStart'"
                );
                done();
            });
    });

    it('should get user highlights', done => {
        chai.request(app)
            .get(`${API_BASE_URL}/articles/2/highlights`)
            .set('Authorization', APIToken)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(200);
                res.body.should.have.property('status').eql('success');
                res.body.should.have
                    .property('message')
                    .eql('Article highlits successfully fetched');
                res.body.should.have.property('data');
                res.body.data.should.have.property('highlights');
                done();
            });
    });
});
