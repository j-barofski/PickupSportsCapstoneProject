import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/editEvent.scss";
import eventAPI from "../API/eventAPI";
import PropTypes from "prop-types";

EditEvent.propTypes = {
    address: PropTypes.object.isRequired,
};

export default function EditEvent({ address }) {
    const [event, setEditEvent] = useState({
        title: "",
        location: "",
        description: "",
        attendees: 1,
        status: "Active"
    });

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await eventAPI.getEvent(id);
                setEditEvent(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchEvent();
    }, [id]);

    const handleEditEventChange = (e) => {
        setEditEvent({
            ...event,
            [e.target.name]: e.target.value,
        });
    }; 

    const handleAttendees = (count) => {
        setEditEvent((prev) => ({
            ...prev,
            attendees: Math.max(1, prev.attendees + count)
        }));
    };

    const handleUpdateEvent = async (e) => {
        setIsLoading(true);
        e.preventDefault();

        if (!event.title || !event.location || !event.description) {
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
        formData.append("status", event.status);

        try {
            const response = await eventAPI.updateEvent(id, formData);
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
            <div className="container">
                <div className="row mt-0 mt-md-4">
                    <div className="col-lg-12 col-md-8 col-12">

                        <section className="py-4 py-lg-6 bg-primary rounded-3">
                            <div className="container">
                                <div className="row">
                                    <div className="offset-lg-1 col-lg-10 col-md-12 col-12">
                                        <div className="d-lg-flex align-items-center justify-content-between">
                                            <div className="mb-4 mb-lg-0">
                                                <h1 className="text-white mb-1">Update Event</h1>
                                                <p className="mb-0 text-white lead">Edit the details for your event.</p>
                                            </div>
                                            <div>
                                                <button onClick={() => navigate("/")} className="btn" style={{ backgroundColor: "white" }}>
                                                    <i className="fas fa-arrow-left"></i> Back to Events
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <form onSubmit={handleUpdateEvent} className="pb-8 mt-5">
                            <div className="card mb-3">
                                <div className="card-header border-bottom px-4 py-3">
                                    <h4 className="mb-0">Event Information</h4>
                                </div>
                                <div className="card-body">

                                    <div className="mb-3">
                                        <label className="form-label">Title</label>
                                        <input onChange={handleEditEventChange} name="title" value={event.title} className="form-control" type="text" placeholder="e.g. Saturday basketball at Riverside" />
                                        <small>Write a 60 character event title.</small>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Location</label>
                                        <input onChange={handleEditEventChange} name="location" value={event.location} className="form-control" type="text" placeholder="Address or place name" />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Description</label>
                                        <textarea onChange={handleEditEventChange} name="description" value={event.description} className="form-control" cols="30" rows="6" placeholder="What's this event about?"></textarea>
                                        <small>A brief summary of your event.</small>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Number of people joining</label>
                                        <div className="d-flex align-items-center gap-2">
                                            <button type="button" className="btn btn-outline-secondary" onClick={() => handleAttendees(-1)}>−</button>
                                            <span className="px-3 fs-5 fw-semibold">{event.attendees}</span>
                                            <button type="button" className="btn btn-outline-secondary" onClick={() => handleAttendees(1)}>+</button>
                                        </div>
                                        <small>Set how many people can join this event.</small>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Status</label>
                                        <select onChange={handleEditEventChange} name="status" value={event.status} className="form-select">
                                            <option value="Active">Active</option>
                                            <option value="Draft">Draft</option>
                                            <option value="Disabled">Disabled</option>
                                        </select>
                                    </div>

                                </div>
                            </div>

                            {isLoading ? (
                                <button className="btn btn-lg btn-secondary w-100 mt-2" disabled>
                                    Updating Event... <i className="fas fa-spinner fa-spin"></i>
                                </button>
                            ) : (
                                <button className="btn btn-lg btn-success w-100 mt-2" type="submit">
                                    Update Event <i className="fas fa-check-circle"></i>
                                </button>
                            )}
                        </form>

                    </div>
                </div>
            </div>
        </section>
    );
}
