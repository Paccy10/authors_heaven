import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

chai.use(chaiHttp);
chai.should();

const API_BASE_URL = '/api/v1';

describe('Vote', () => {
    let APIToken;
    let APIToken2;

    before(async () => {
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

        APIToken = `Bearer ${response.body.data.token}`;
        APIToken2 = `Bearer ${response2.body.data.token}`;
    });

    it('should like an article', done => {
        chai.request(app)
            .post(`${API_BASE_URL}/articles/2/like`)
            .set('Authorization', APIToken)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(201);
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

    it('should not like an article if it is already liked', done => {
        chai.request(app)
            .post(`${API_BASE_URL}/articles/2/like`)
            .set('Authorization', APIToken)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(400);
                res.body.should.have.property('status').eql('error');
                res.body.should.have.property('errors');
                res.body.errors[0].msg.should.equal(
                    'Sorry, you have already liked this article'
                );
                done();
            });
    });

    it('should dislike a liked article', done => {
        chai.request(app)
            .post(`${API_BASE_URL}/articles/2/dislike`)
            .set('Authorization', APIToken)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(200);
                res.body.should.have.property('status').eql('success');
                res.body.should.have
                    .property('message')
                    .eql('Article successfully disliked');
                res.body.should.have.property('data');
                res.body.data.should.have.property('vote');
                res.body.data.vote.vote.should.equal(false);
                done();
            });
    });

    it('should not dislike an article if it is already disliked', done => {
        chai.request(app)
            .post(`${API_BASE_URL}/articles/2/dislike`)
            .set('Authorization', APIToken)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(400);
                res.body.should.have.property('status').eql('error');
                res.body.should.have.property('errors');
                res.body.errors[0].msg.should.equal(
                    'Sorry, you have already disliked this article'
                );
                done();
            });
    });

    it('should like a disliked article', done => {
        chai.request(app)
            .post(`${API_BASE_URL}/articles/2/like`)
            .set('Authorization', APIToken)
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

    it('should dislike an article', done => {
        chai.request(app)
            .post(`${API_BASE_URL}/articles/2/dislike`)
            .set('Authorization', APIToken2)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(201);
                res.body.should.have.property('status').eql('success');
                res.body.should.have
                    .property('message')
                    .eql('Article successfully disliked');
                res.body.should.have.property('data');
                res.body.data.should.have.property('vote');
                res.body.data.vote.vote.should.equal(false);
                done();
            });
    });
});
