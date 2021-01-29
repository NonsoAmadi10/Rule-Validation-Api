import chai , {expect} from 'chai';
import chaiHttp from 'chai-http';
import app from '../src'; 

chai.use(chaiHttp);


describe('test', () => {
    it('should get my personal info', (done) => {
        chai.request(app)
        .get('/')
        .end((err, res) =>{
            expect(res.status).to.be.equal(200);
            
        expect(res.body).to.be.a('object');
        expect(res.body.data).to.have.all.keys(['name', 'github', 'email', 'twitter', 'mobile']);
        expect(res.body.data['github']).to.include('@')
        done();
        } )
    });
});