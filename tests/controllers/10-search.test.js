import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

chai.use(chaiHttp);
chai.should();

const API_BASE_URL = '/api/v1';

describe('Search', () => {
    it('should search an article', done => {
        chai.request(app)
            .post(`${API_BASE_URL}/search?query=test`)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(200);
                res.body.should.have.property('status').eql('success');
                res.body.should.have
                    .property('message')
                    .eql('Articles successfully fetched');
                res.body.should.have.property('data');
                res.body.data.should.have.property('articles');
                done();
            });
    });

    it('should not search an article if query param is not valid', done => {
        chai.request(app)
            .post(`${API_BASE_URL}/search`)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(400);
                res.body.should.have.property('status').eql('error');
                res.body.should.have.property('errors');
                res.body.errors[0].msg.should.equal(
                    "'query' is a required query param for this request"
                );
                done();
            });
    });
});
