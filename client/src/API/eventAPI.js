import API from "../api";

const eventAPI = {
    createEvent: (formData) =>
        API.post("/events", formData),

    getEvents: (latitude, longitude) => 
        API.get("/events/", { params: { latitude, longitude } }),

    getEvent: (id) => 
        API.get(`/events/${id}/`),

    updateEvent: (id, formData) => 
        API.put(`/events/${id}/`, formData),

    deleteEvent: (id) => 
        API.delete(`/events/${id}/`),

    joinEvent: (id) =>
        API.put(`/events/${id}/join`)
};

export default eventAPI;