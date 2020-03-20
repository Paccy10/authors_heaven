import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

chai.use(chaiHttp);
chai.should();

const API_BASE_URL = '/api/v1';

describe('Report Article', () => {
    let APIToken;
    let APIToken2;

    before(async () => {
        const response = await chai
            .request(app)
            .post(`${API_BASE_URL}/auth/login`)
            .send({
                email: 'test.articleuser@app.com',
                password: 'Password12345'
            });

        const response2 = await chai
            .request(app)
            .post(`${API_BASE_URL}/auth/login`)
            .send({ email: 'test.user@app.com', password: 'Password12345' });

        APIToken = `Bearer ${response.body.data.token}`;
        APIToken2 = `Bearer ${response2.body.data.token}`;

        await chai
            .request(app)
            .post(`${API_BASE_URL}/report/types`)
            .set('Authorization', APIToken)
            .send({ type: 'plagiarism' });
    });

    it('should create a report type', done => {
        chai.request(app)
            .post(`${API_BASE_URL}/report/types`)
            .set('Authorization', APIToken)
            .send({ type: 'bad' })
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(201);
                res.body.should.have.property('status').eql('success');
                res.body.should.have
                    .property('message')
                    .eql('Report type successfully created');
                res.body.should.have.property('data');
                res.body.data.should.have.property('reportType');
                res.body.data.reportType.type.should.equal('bad');
                done();
            });
    });

    it('should not create a report type if it exists', done => {
        chai.request(app)
            .post(`${API_BASE_URL}/report/types`)
            .set('Authorization', APIToken)
            .send({ type: 'plagiarism' })
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(409);
                res.body.should.have.property('status').eql('error');
                res.body.should.have.property('errors');
                res.body.errors[0].msg.should.equal(
                    'Report type already exists'
                );
                done();
            });
    });

    it('should get all report types', done => {
        chai.request(app)
            .get(`${API_BASE_URL}/report/types`)
            .set('Authorization', APIToken)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(200);
                res.body.should.have.property('status').eql('success');
                res.body.should.have.property('data');
                res.body.data.should.have.property('reportTypes');
                done();
            });
    });

    it('should report an article', done => {
        chai.request(app)
            .post(`${API_BASE_URL}/articles/2/report`)
            .set('Authorization', APIToken)
            .send({ comment: 'bad', reportTypeId: 1 })
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(201);
                res.body.should.have.property('status').eql('success');
                res.body.should.have
                    .property('message')
                    .eql('Article successfully reported');
                res.body.should.have.property('data');
                res.body.data.should.have.property('reportArticle');
                res.body.data.reportArticle.comment.should.equal('bad');
                done();
            });
    });

    it('should not report an article if report type does not exist', done => {
        chai.request(app)
            .post(`${API_BASE_URL}/articles/2/report`)
            .set('Authorization', APIToken)
            .send({ comment: 'bad', reportTypeId: 100 })
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(404);
                res.body.should.have.property('status').eql('error');
                res.body.should.have.property('errors');
                res.body.errors[0].msg.should.equal('Report type not found');
                done();
            });
    });

    it('should get all reported articles', done => {
        chai.request(app)
            .get(`${API_BASE_URL}/report/articles`)
            .set('Authorization', APIToken)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(200);
                res.body.should.have.property('status').eql('success');
                res.body.should.have.property('data');
                res.body.data.should.have.property('reportedArticles');
                done();
            });
    });

    it('should not get all reported articles if the user is not an admin', done => {
        chai.request(app)
            .get(`${API_BASE_URL}/report/articles`)
            .set('Authorization', APIToken2)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(403);
                res.body.should.have.property('status').eql('error');
                res.body.should.have.property('errors');
                res.body.errors[0].msg.should.equal(
                    'Permission denied. You are not allowed to perform this action.'
                );
                done();
            });
    });
});
