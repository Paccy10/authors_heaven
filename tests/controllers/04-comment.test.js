import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

chai.use(chaiHttp);
chai.should();

const API_BASE_URL = '/api/v1';

describe('Comment', () => {
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

    it('should get all comments', done => {
        chai.request(app)
            .get(`${API_BASE_URL}/articles/2/comments`)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(200);
                res.body.should.have.property('status').eql('success');
                res.body.should.have.property('data');
                res.body.data.should.have.property('comments');
                done();
            });
    });

    it('should update a comment', done => {
        chai.request(app)
            .patch(`${API_BASE_URL}/articles/2/comments/1`)
            .set('Authorization', APIToken)
            .send({ body: 'bad article' })
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(200);
                res.body.should.have.property('status').eql('success');
                res.body.should.have
                    .property('message')
                    .eql('Comment successfully updated');
                res.body.should.have.property('data');
                res.body.data.should.have.property('comment');
                res.body.data.comment.body.should.equal('bad article');
                done();
            });
    });

    it('should not update a comment if the comment does not exist', done => {
        chai.request(app)
            .patch(`${API_BASE_URL}/articles/2/comments/10`)
            .set('Authorization', APIToken)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(404);
                res.body.should.have.property('status').eql('error');
                res.body.should.have.property('errors');
                res.body.errors[0].msg.should.equal('Comment not found');
                done();
            });
    });

    it('should not update a comment if you are not the owner', done => {
        chai.request(app)
            .patch(`${API_BASE_URL}/articles/2/comments/1`)
            .set('Authorization', APIToken2)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(403);
                res.body.should.have.property('status').eql('error');
                res.body.should.have.property('errors');
                res.body.errors[0].msg.should.equal(
                    'Permission denied. You can not edit a comment that is not yours'
                );
                done();
            });
    });

    it('should delete a comment', done => {
        chai.request(app)
            .delete(`${API_BASE_URL}/articles/2/comments/1`)
            .set('Authorization', APIToken)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(200);
                res.body.should.have.property('status').eql('success');
                res.body.should.have
                    .property('message')
                    .eql('Comment successfully deleted');
                done();
            });
    });
});
