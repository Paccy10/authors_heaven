import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

chai.use(chaiHttp);
chai.should();

const API_BASE_URL = '/api/v1';

describe('Reading Stats', () => {
    let APIToken;

    before(async () => {
        const response = await chai
            .request(app)
            .post(`${API_BASE_URL}/auth/login`)
            .send({ email: 'test.user@app.com', password: 'Password12345' });

        APIToken = `Bearer ${response.body.data.token}`;
    });

    it('should record a reading', done => {
        chai.request(app)
            .post(`${API_BASE_URL}/articles/2/readings`)
            .set('Authorization', APIToken)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(201);
                res.body.should.have.property('status').eql('success');
                res.body.should.have
                    .property('message')
                    .eql('Reading successfully recorded');
                res.body.should.have.property('data');
                res.body.data.should.have.property('reading');
                res.body.data.reading.numberOfReadings.should.equal(1);
                done();
            });
    });

    it('should update a reading', done => {
        chai.request(app)
            .post(`${API_BASE_URL}/articles/2/readings`)
            .set('Authorization', APIToken)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(200);
                res.body.should.have.property('status').eql('success');
                res.body.should.have
                    .property('message')
                    .eql('Reading successfully recorded');
                res.body.should.have.property('data');
                res.body.data.should.have.property('reading');
                res.body.data.reading.numberOfReadings.should.equal(2);
                done();
            });
    });

    it('should get all user  total readings', done => {
        chai.request(app)
            .get(`${API_BASE_URL}/users/readings`)
            .set('Authorization', APIToken)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(200);
                res.body.should.have.property('status').eql('success');
                res.body.should.have
                    .property('message')
                    .eql('User total readings successfully fetched');
                res.body.should.have.property('data');
                res.body.data.should.have.property('totalReadings');
                res.body.data.totalReadings.should.equal(2);
                done();
            });
    });
});
