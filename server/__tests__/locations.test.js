const request = require('supertest');
const app = require('../server');

const db = require("../models")

describe("Locations API", () => {
    // GET
    test("GET /locations should return all locations with events", async () => {
        const response = await request(app).get("/locations");

        expect(response.status).toBe(200);
    });

    test("GET /locations should return 500 on database error", async () => {
        const response = await request(app).get("/locations");
        expect(response.status).toBe(500);
    });


    // POST
    test("POST /locations should create a new location", async () => {
        const newLocation = {
            id: 1,
            name: "Example Park",
            latitude: 1,
            latitude: 1.1
          };
        
        const response = await request(app)
            .post('/locations')
            .send({ name: "Example Park", latitude: 1, latitude: 1.1 });
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id");
        expect(response.body.name).toBe("Example Park");
    });

    test("POST /locations should return 500 on database error", async () => {
        const response = await request(app)
            .post("/locations")
            .send({ name: "Example Park" });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty("error");
    });


    // PUT
    test("PUT /locations/:id should update an existing location", async () => {
        const updatedLocation = {
            id: 1,
            name: "Updated Park",
            latitude: 1,
            latitude: 1.1
          };
        
        const response = await request(app)
            .post('/locations/1')
            .send(updatedLocations);
        
        expect(response.status).toBe(200);
        expect(response.body.name).toHaveProperty("Updated Park");
    });

    test("PUT /locations/:id should return 500 on database error", async () => {
        const response = await request(app)
            .post('/locations/2')
            .send(updatedLocation);
        
        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty("error");
    });


    // DELETE
    test("DELETE /locations/:id should delete an existing location", async () => {
        const response = await request(app).delete("/locations/1");

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message");
    });

    test("DELETE /locations/:id should 500 on database error", async () => {
        const response = await request(app).delete("/events/2");

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty("error");
    });
})