import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
chai.should();

describe('Application', () => {
    it('should throw an error message if the route does not exist', done => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(404);
                res.body.should.have.property('status').eql('error');
                res.body.should.have.property('message').eql('Undefined route');
                done();
            });
    });
});
