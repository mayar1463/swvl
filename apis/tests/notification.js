const chai = require('chai')
const chaiHttp = require('chai-http')
let app = require('../app');
// Configure chai
chai.use(chaiHttp);
chai.should();
describe("Notifications", () => {
    const notificationsEndPoint = '/api/v1/notifications';
    // Pet POST requests
    describe("POST /", () => {

        // Test to add Notification
        it("Should post the sms, return 201 and object of sms", (done) => {
            const notification = {
                "message": "hi mayar 1",
                "type": "group",
                "group_id": 1471387774911
            }
            chai.request(app)
                .post(`${notificationsEndPoint}`)
                .set('Content-Type', 'application/json')
                .send(notification)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    done();
                });
        });

        // Test to add Notification
        it("Should not post Notification because something wrong in the post body, return 422 and object", (done) => {
            const notification = {
                "message": "hi mayar 1",
                "type": "individual",
                "group_id": 1471387774911
            }
            chai.request(app)
                .post(`${notificationsEndPoint}`)
                .set('Content-Type', 'application/json')
                .send(notification)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    // Pet GET requests
    describe("GET /", () => {

        //Test to get single record
        it("Should all notification by customer id", (done) => {
            const customer_id = "1571387774911";
            chai.request(app)
                .get(`${notificationsEndPoint}/${customer_id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('Array');
                    done();
                });
        });

        // Test to get single record
        it("Should all notification by customer id when not notification exits", (done) => {
            const customer_id = 1571416771683; //wrong id
            chai.request(app)
                .get(`${notificationsEndPoint}/${customer_id}`)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
});