import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import { newUser, newPermission, newPermission2 } from '../data/permission';
import models from '../../models';

chai.use(chaiHttp);
chai.should();

const API_BASE_URL = '/api/v1';
const { user: User, permission: Permission } = models;

describe('Permission', () => {
    let APIToken;

    before(async () => {
        await User.create(newUser);
        await Permission.create(newPermission2);
        const response = await chai
            .request(app)
            .post(`${API_BASE_URL}/auth/login`)
            .send({
                email: 'test.superuser@app.com',
                password: 'Password12345'
            });

        APIToken = `Bearer ${response.body.data.token}`;
    });

    it('should create a permission', done => {
        chai.request(app)
            .post(`${API_BASE_URL}/permissions`)
            .set('Authorization', APIToken)
            .send(newPermission)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(201);
                res.body.should.have.property('status').eql('success');
                res.body.should.have
                    .property('message')
                    .eql('Permission successfully created');
                res.body.should.have.property('data');
                res.body.data.should.have.property('permission');
                res.body.data.permission.type.should.equal('create:article');
                done();
            });
    });

    it('should get all permissions', done => {
        chai.request(app)
            .get(`${API_BASE_URL}/permissions`)
            .set('Authorization', APIToken)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(200);
                res.body.should.have.property('status').eql('success');
                res.body.should.have
                    .property('message')
                    .eql('Permissions successfully fetched');
                res.body.should.have.property('data');
                res.body.data.should.have.property('permissions');
                done();
            });
    });

    it('should update a permission', done => {
        chai.request(app)
            .put(`${API_BASE_URL}/permissions/1`)
            .set('Authorization', APIToken)
            .send({ type: 'update:article', description: 'update an article' })
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(200);
                res.body.should.have.property('status').eql('success');
                res.body.should.have
                    .property('message')
                    .eql('Permission successfully updated');
                res.body.should.have.property('data');
                res.body.data.should.have.property('permission');
                res.body.data.permission.type.should.equal('update:article');
                done();
            });
    });

    it('should not update a permission if it exists', done => {
        chai.request(app)
            .put(`${API_BASE_URL}/permissions/2`)
            .set('Authorization', APIToken)
            .send({ type: 'update:article', description: 'update an article' })
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(409);
                res.body.should.have.property('status').eql('error');
                res.body.should.have.property('errors');
                res.body.errors[0].msg.should.equal(
                    'Permission type already exists'
                );
                done();
            });
    });

    it('should not update a permission if the permission ID does not exist', done => {
        chai.request(app)
            .put(`${API_BASE_URL}/permissions/10`)
            .set('Authorization', APIToken)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(404);
                res.body.should.have.property('status').eql('error');
                res.body.should.have.property('errors');
                res.body.errors[0].msg.should.equal('Permission not found');
                done();
            });
    });

    it('should delete a permission', done => {
        chai.request(app)
            .delete(`${API_BASE_URL}/permissions/1`)
            .set('Authorization', APIToken)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(200);
                res.body.should.have.property('status').eql('success');
                res.body.should.have
                    .property('message')
                    .eql('Permission successfully deleted');
                done();
            });
    });
});
