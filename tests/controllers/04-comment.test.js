import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

chai.use(chaiHttp);
chai.should();

const API_BASE_URL = '/api/v1';

describe('Comment', () => {
    let APIToken;

    before(async () => {
        const response = await chai
            .request(app)
            .post(`${API_BASE_URL}/auth/login`)
            .send({ email: 'test.user@app.com', password: 'Password12345' });

        APIToken = `Bearer ${response.body.data.token}`;
    });

    it('should create a comment for an article', done => {
        chai.request(app)
            .post(`${API_BASE_URL}/articles/2/comments`)
            .set('Authorization', APIToken)
            .send({ body: 'good' })
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(201);
                res.body.should.have.property('status').eql('success');
                res.body.should.have
                    .property('message')
                    .eql('Comment successfully created');
                res.body.should.have.property('data');
                res.body.data.should.have.property('comment');
                res.body.data.comment.body.should.equal('good');
                done();
            });
    });
});
