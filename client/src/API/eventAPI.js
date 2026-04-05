import API from "../api";

const eventAPI = {
    createEvent: (formData) =>
        API.post("/events/create/", formData),

    getEvents: (latitude, longitude) => 
        API.get("/events/", { params: { latitude, longitude } }),

    updateEvent: (id, formData) => 
        API.put(`/events/${id}/update/`, formData),

    deleteEvent: (id) => 
        API.delete(`/events/${id}/delete/`)
};

export default eventAPI;