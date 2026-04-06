const request = require('supertest');
const app = require('../server');

const db = require("../models")

describe("Events API", () => {
    // GET
    test("GET /events should return all events", async () => {
        const response = await request(app).get("/events");

        expect(response.status).toBe(200);
    });

    test("GET /events should return 500 on database error", async () => {
        const response = await request(app).get("/events");
        expect(response.status).toBe(500);
    });


    // POST
    test("POST /events should create a new event", async () => {
        const newEvent = {
            id: 1,
            title: "Pickup",
            date: "2026-04-05"
          };
        
        const response = await request(app)
            .post('/events')
            .send({ name: "Pickup", date: "2026-04-05" });
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id");
        expect(response.body.title).toBe("Pickup");
    });

    test("POST /events should return 500 on database error", async () => {
        const response = await request(app)
            .post("/events")
            .send({ title: "Pickup" });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty("error");
    });


    // PUT
    test("PUT /events/:id should update an existing event", async () => {
        const updatedEvent = {
            id: 1,
            title: "Pickup",
            date: "2026-04-06"
          };
        
        const response = await request(app)
            .post('/events/1')
            .send(updatedEvent);
        
        expect(response.status).toBe(200);
        expect(response.body.date).toHaveProperty("2026-04-06");
    });

    test("PUT /events/:id should return 500 on database error", async () => {
        const updatedEvent = {
            id: 2,
            title: "Pickup",
            date: "2026-04-06"
          };
        
        const response = await request(app)
            .post('/events/1')
            .send(updatedEvent);
        
        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty("error");
    });


    // DELETE
    test("DELETE /events/:id should delete an existing event", async () => {
        const response = await request(app).delete("/events/1");

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message");
    });

    test("DELETE /events/:id should 500 on database error", async () => {
        const response = await request(app).delete("/events/2");

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty("error");
    });
})