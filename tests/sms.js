const chai = require('chai')
const chaiHttp = require('chai-http')
let app = require('../app');
// Configure chai
chai.use(chaiHttp);
chai.should();
describe("SMS", () => {
    const smsEndPoint = '/api/v1/sms';
    // Pet POST requests
    describe("POST /", () => {

        // Test to add sms
        it("Should post the sms, return 201 and object of sms", (done) => {
            const sms = {
                "phones": [
                    {
                        "phone": 1
                    }
                ],
                "promocode":"123456"
            }
            chai.request(app)
                .post(`${smsEndPoint}`)
                .set('Content-Type', 'application/json')
                .send(sms)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    done();
                });
        });

        // Test to add sms
        it("Should not post notification because something wrong in the post body, return 422 and object", (done) => {
            const sms = {
                "phones": [
                    {
                        "phone1": 1
                    }
                ]
            }
            chai.request(app)
                .post(`${smsEndPoint}`)
                .set('Content-Type', 'application/json')
                .send(sms)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

});