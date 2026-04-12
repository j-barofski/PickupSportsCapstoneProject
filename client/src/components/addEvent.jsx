import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/addOrEditEvent.scss";
import eventAPI from "../API/eventAPI";
import PropTypes from "prop-types";

AddEvent.propTypes = {
    address: PropTypes.object.isRequired,
};

export default function AddEvent({ address }) {
    const [event, setCreateEvent] = useState({
        title: "",
        location: "",
        description: "",
        attendees: 1,
        time: ""
    });

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleCreateEventChange = (e) => {
        setCreateEvent({
            ...event,
            [e.target.name]: e.target.value,
        });
    };

    const handleAttendees = (count) => {
        setCreateEvent((prev) => ({
            ...prev,
            attendees: Math.max(1, prev.attendees + count)
        }));
    };

    const handleCreateEvent = async (e) => {
        setIsLoading(true);
        e.preventDefault();

        if (!event.title || !event.location || !event.description || !event.time) {
            alert("All fields are required");
            console.log("All fields are required");
            setIsLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append("title", event.title);
        formData.append("location", event.location);
        formData.append("latitude", address.latitude);
        formData.append("longitude", address.longitude);
        formData.append("description", event.description);
        formData.append("attendees", event.attendees);
        formData.append("time", event.time);

        try {
            const response = await eventAPI.createEvent(formData);
            console.log(response.data);
            console.log("Event created");
            setIsLoading(false);
            navigate("/");
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    return (
        <section className="pt-5 pb-5">
            <div className="event-header">
                <div className="d-flex align-items-center justify-content-between">
                    <h1 className="text-white mb-0">Create Event</h1>
                    <button onClick={() => navigate("/")} className="btn btn-outline-light">
                        <i className="fas fa-arrow-left"></i> Back to Events
                    </button>
                </div>
            </div>
    
            <form onSubmit={handleCreateEvent}>
                <div className="card mb-3">
                    <div className="card-header border-bottom">
                        <h4 className="mb-0">Event Information</h4>
                    </div>
                    <div className="card-body">
                        <div className="form-grid">
    
                            <div className="mb-3 form-grid-full">
                                <label className="form-label">Title</label>
                                <input onChange={handleCreateEventChange} name="title" value={event.title} className="form-control" type="text" placeholder="e.g. Pickup Basketball" />
                            </div>
    
                            <div className="mb-3">
                                <label className="form-label">Location</label>
                                <input onChange={handleCreateEventChange} name="location" value={event.location} className="form-control" type="text" placeholder="Address or place name" />
                            </div>
    
                            <div className="mb-3">
                                <label className="form-label">Time</label>
                                <input onChange={handleCreateEventChange} name="time" value={event.time} className="form-control" type="datetime-local" />
                            </div>
    
                            <div className="mb-3 form-grid-full">
                                <label className="form-label">Description</label>
                                <textarea onChange={handleCreateEventChange} name="description" value={event.description} className="form-control" rows="2" placeholder="What's this event about?"></textarea>
                            </div>
    
                            <div className="mb-3">
                                <label className="form-label">Number of people joining</label>
                                <div className="attendees-control">
                                    <button type="button" className="btn btn-outline-secondary" onClick={() => handleAttendees(-1)}>−</button>
                                    <span>{event.attendees}</span>
                                    <button type="button" className="btn btn-outline-secondary" onClick={() => handleAttendees(1)}>+</button>
                                </div>
                            </div>
    
                        </div>
                    </div>
                </div>
    
                {isLoading ? (
                    <button className="btn btn-lg btn-secondary w-100 mt-2" disabled>
                        Creating Event... <i className="fas fa-spinner fa-spin"></i>
                    </button>
                ) : (
                    <button className="btn btn-lg btn-success w-100 mt-2" type="submit">
                        Create Event <i className="fas fa-check-circle"></i>
                    </button>
                )}
            </form>
        </section>
    );
}

