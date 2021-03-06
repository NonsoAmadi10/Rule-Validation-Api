import chai , {expect} from 'chai';
import chaiHttp from 'chai-http';
import app from '../src'; 

chai.use(chaiHttp);


describe('GET /', () => {
    it('should get my personal info', (done) => {
        chai.request(app)
        .get('/')
        .end((err, res) =>{
            expect(res.status).to.be.equal(200);
            
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.equal('My Rule-Validation API')
        expect(res.body.data).to.have.all.keys(['name', 'github', 'email', 'twitter', 'mobile']);
        expect(res.body.data['github']).to.include('@')
        done();
        } );
    });
});

describe('POST /validate-rule', () => {
    it('should check if the rule field is not passed', (done) => {
        const body = {
            data: {name: "James Holden", crew: "Rocinante", age: 34, position: "Captain",missions: 45}
        }

        chai.request(app)
        .post('/validate-rule')
        .send(body)
        .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.message).to.equal('rule is required.');
            expect(res.body.data).to.equal(null);
            expect(res.body.status).to.equal('error');
            done();
        });
    });

    it('should check if the data field is not passed', (done) => {
        const body = { rule: { field: "missions", condition: "gte",condition_value: 30 }};

        chai.request(app)
        .post('/validate-rule')
        .send(body)
        .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.message).to.equal('data is required.');
            expect(res.body.data).to.equal(null);
            expect(res.body.status).to.equal('error');
            done();
        });
    });

    it('should check if the rule field is an object', (done) => {
        const body = {
            rule: "hi",
            data: {name: "James Holden", crew: "Rocinante", age: 34, position: "Captain",missions: 45}
        };
        chai.request(app)
        .post('/validate-rule')
        .send(body)
        .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.message).to.equal('rule should be an object.');
            expect(res.body.data).to.equal(null);
            expect(res.body.status).to.equal('error');
            done();
        });

    });

    it('should check for invalid JSON payload', (done) => {
        const body = {
            rule: { field: "missions", condition: "gte",condition_value: 30 },
            data: {name: "James Holden", crew: "Rocinante", age: 34, position: "Captain",missions: 45},
            name: "Nonso Amadi"
        };
        chai.request(app)
        .post('/validate-rule')
        .send(body)
        .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.message).to.equal('Invalid JSON payload passed.')
            done();
        });

    });

    it('should check if a field is empty in the rule object', (done) => {
        const body = {
            rule: { field: "", condition: "gte",condition_value: 30 },
            data: {name: "James Holden", crew: "Rocinante", age: 34, position: "Captain",missions: 45},
        };
        chai.request(app)
        .post('/validate-rule')
        .send(body)
        .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.message).to.equal('field is required in the rule object.')
            done();
        });

    });

    it('should check if a field is empty in the rule object', (done) => {
        const body = {
            rule: { field: "missions", condition: "",condition_value: 30 },
            data: {name: "James Holden", crew: "Rocinante", age: 34, position: "Captain",missions: 45},
        };
        chai.request(app)
        .post('/validate-rule')
        .send(body)
        .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.message).to.equal('condition is required in the rule object.')
            done();
        });

    });

    it('should check if a field is empty in the rule object', (done) => {
        const body = {
            rule: { field: "missions", condition: "gte",condition_value: "" },
            data: {name: "James Holden", crew: "Rocinante", age: 34, position: "Captain",missions: 45},
        };
        chai.request(app)
        .post('/validate-rule')
        .send(body)
        .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.message).to.equal('condition value is required in the rule object.')
            done();
        });

    });

    it('should check if a rule field is missing in the data object', (done) => {
        const body = {
            rule: { field: "missions", condition: "gte",condition_value: 30 },
            data: {name: "James Holden", crew: "Rocinante", age: 34, position: "Captain"},
        };
        chai.request(app)
        .post('/validate-rule')
        .send(body)
        .end((err, res) => {
        
            expect(res.status).to.equal(400);
            expect(res.body.message).to.equal('field missions is missing from data.')
            done();
        });

    });


    it('should accept JSON data containing a rule and data field to validate the rule against.', (done) => {
        const body = {
            rule: { field: "missions", condition: "gte",condition_value: 30 },
            data: {name: "James Holden", crew: "Rocinante", age: 34, position: "Captain", missions: 45},
        };
        chai.request(app)
        .post('/validate-rule')
        .send(body)
        .end((err, res) => {
        
            expect(res.status).to.equal(200);
            expect(res.body.message).to.equal('field missions successfully validated.')
            done();
        });

    });
    it('should accept JSON data containing a rule and data field to validate the rule against.', (done) => {
        const body = {
            rule: { field: "missions.cat", condition: "gte",condition_value: 30 },
            data: {name: "James Holden", crew: "Rocinante", age: 34, position: "Captain", missions: { cat: 45}},
        };
        chai.request(app)
        .post('/validate-rule')
        .send(body)
        .end((err, res) => {
        
            expect(res.status).to.equal(200);
            expect(res.body.message).to.equal('field missions.cat successfully validated.')
            done();
        });

    });
    it('should accept JSON data containing a rule and data of type array to validate the rule against.', (done) => {
        const body = {
            rule: { field: 45, condition: "gt",condition_value: 30 },
            data: [45],
        };
        chai.request(app)
        .post('/validate-rule')
        .send(body)
        .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.message).to.equal('field 45 successfully validated.')
            done();
        });

    });
    it('should fail if the rule and data field is more than 2 nested level', (done) => {
        const body = {
            rule: { field: "missions.cat.cat.bat", condition: "gte",condition_value: 30 },
            data: {name: "James Holden", crew: "Rocinante", age: 34, position: "Captain", missions: { cat:{ cat: { bat: 29}}}},
        };
        chai.request(app)
        .post('/validate-rule')
        .send(body)
        .end((err, res) => {
            expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('error');
           expect(res.body.message).to.equal('field missions.cat.cat.bat nesting should not be more than two levels.')
            done();
        });

    });

    it('should fail If the rule validation fails', (done) => {
        const body = {
            rule: { field: "missions", condition: "eq",condition_value: 30 },
            data: {name: "James Holden", crew: "Rocinante", age: 34, position: "Captain", missions: 45},
        };
        chai.request(app)
        .post('/validate-rule')
        .send(body)
        .end((err, res) => {
       
            expect(res.status).to.equal(400);
            expect(res.body.data.validation).to.have.all.keys(['error', 'field_value', 'field', 'condition', 'condition_value']);
            expect(res.body.data.validation.error).to.equal(true);
            expect(res.body.message).to.equal('field missions failed validation.');
            done();
        });

    });
    
});