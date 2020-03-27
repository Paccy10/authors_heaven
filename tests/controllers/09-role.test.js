import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import { newRole, newRole2 } from '../data/role';
import models from '../../models';

chai.use(chaiHttp);
chai.should();

const API_BASE_URL = '/api/v1';
const { role: Role } = models;

describe('Role', () => {
    let APIToken;

    before(async () => {
        await Role.create(newRole2);
        const response = await chai
            .request(app)
            .post(`${API_BASE_URL}/auth/login`)
            .send({
                email: 'test.superuser@app.com',
                password: 'Password12345'
            });

        APIToken = `Bearer ${response.body.data.token}`;
    });

    it('should create a role', done => {
        chai.request(app)
            .post(`${API_BASE_URL}/roles`)
            .set('Authorization', APIToken)
            .send(newRole)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(201);
                res.body.should.have.property('status').eql('success');
                res.body.should.have
                    .property('message')
                    .eql('Role successfully created');
                res.body.should.have.property('data');
                res.body.data.should.have.property('role');
                res.body.data.role.title.should.equal('Test');
                done();
            });
    });

    it('should get all roles', done => {
        chai.request(app)
            .get(`${API_BASE_URL}/roles`)
            .set('Authorization', APIToken)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(200);
                res.body.should.have.property('status').eql('success');
                res.body.should.have
                    .property('message')
                    .eql('Roles successfully fetched');
                res.body.should.have.property('data');
                res.body.data.should.have.property('roles');
                done();
            });
    });

    it('should update a role', done => {
        chai.request(app)
            .put(`${API_BASE_URL}/roles/4`)
            .set('Authorization', APIToken)
            .send({ title: 'Test update', description: 'description' })
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(200);
                res.body.should.have.property('status').eql('success');
                res.body.should.have
                    .property('message')
                    .eql('Role successfully updated');
                res.body.should.have.property('data');
                res.body.data.should.have.property('role');
                res.body.data.role.title.should.equal('Test update');
                done();
            });
    });

    it('should not update a role if it exists', done => {
        chai.request(app)
            .put(`${API_BASE_URL}/roles/5`)
            .set('Authorization', APIToken)
            .send({ title: 'Test update', description: 'description' })
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(409);
                res.body.should.have.property('status').eql('error');
                res.body.should.have.property('errors');
                res.body.errors[0].msg.should.equal(
                    'Role title already exists'
                );
                done();
            });
    });

    it('should not update a role if the role ID does not exist', done => {
        chai.request(app)
            .put(`${API_BASE_URL}/roles/10`)
            .set('Authorization', APIToken)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(404);
                res.body.should.have.property('status').eql('error');
                res.body.should.have.property('errors');
                res.body.errors[0].msg.should.equal('Role not found');
                done();
            });
    });

    it('should delete a role', done => {
        chai.request(app)
            .delete(`${API_BASE_URL}/roles/4`)
            .set('Authorization', APIToken)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(200);
                res.body.should.have.property('status').eql('success');
                res.body.should.have
                    .property('message')
                    .eql('Role successfully deleted');
                done();
            });
    });

    it('should assign permissions to a role', done => {
        chai.request(app)
            .post(`${API_BASE_URL}/roles/3/permissions`)
            .set('Authorization', APIToken)
            .send({ permissions: [2] })
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(200);
                res.body.should.have.property('status').eql('success');
                res.body.should.have
                    .property('message')
                    .eql('Permissions successfully assinged');
                done();
            });
    });

    it('should not assign permissions to a role if one the permissions ID does not exist', done => {
        chai.request(app)
            .post(`${API_BASE_URL}/roles/3/permissions`)
            .set('Authorization', APIToken)
            .send({ permissions: [2, 3] })
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

    it('should not assign permissions to a role if permissions are not an array', done => {
        chai.request(app)
            .post(`${API_BASE_URL}/roles/3/permissions`)
            .set('Authorization', APIToken)
            .send({ permissions: '2' })
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(400);
                res.body.should.have.property('status').eql('error');
                res.body.should.have.property('errors');
                res.body.errors[0].msg.should.equal(
                    'Permissions must be an array'
                );
                done();
            });
    });

    it('should not assign permissions to a role if permissions array is empty', done => {
        chai.request(app)
            .post(`${API_BASE_URL}/roles/3/permissions`)
            .set('Authorization', APIToken)
            .send({ permissions: [] })
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(400);
                res.body.should.have.property('status').eql('error');
                res.body.should.have.property('errors');
                res.body.errors[0].msg.should.equal('Permissions are required');
                done();
            });
    });
});
