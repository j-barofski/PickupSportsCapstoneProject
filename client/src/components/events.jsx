import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/events.scss";
import eventAPI from "../API/eventAPI";
import PropTypes from "prop-types";

Events.propTypes = {
    address: PropTypes.object.isRequired,
};

export default function Events({ address }) {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await eventAPI.getEvents(address.latitude, address.longitude);
                setEvents(response.data);
            } catch (error) {
                console.log(error)
            }         
        };
        fetchEvents();
    }, [address]);

    const handleDeleteEvent = async (id) => {
        try {
            await eventAPI.deleteEvent(id);
            setEvents(events.filter((e) => e.id !== id));
        } catch (error) {
            console.log(error);
        }
    }

    const handleJoinEvent = async (id) => {
        try {
            const response = await eventAPI.joinEvent(id);
            setEvents(events.map((e) => {
                if (e.id === id) {
                    return response.data;       
                }
                return e
            }));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="card border bg-transparent rounded-3">
            <div className="card-header bg-transparent border-bottom p-3">
                <div className="d-sm-flex justify-content-between align-items-center">
                    <h5 className="mb-2 mb-sm-0">
                        Events Near You: {" "}
                        <span className="badge bg-primary bg-opacity-10 text-primary">
                            {events?.length}
                        </span>
                    </h5>
                    <button onClick={() => navigate("/events/add")} className="btn btn-sm btn-primary mb-0">
                        Add New <i className="fas fa-plus"></i>
                    </button>
                </div>
            </div>

            <div className="card-body">
                {events?.length === 0 && (
                    <p className="text-center text-muted py-3">No events near you.</p>
                )}
                {events?.map((e) => (
                    <div key={e.id} className="event-item">
                        <div className="event-item-header">
                            <h6 className="event-title">{e.title}</h6>
                            <div className="event-actions">
                                <button onClick={() => handleJoinEvent(e.id)} className="btn btn-join" title="Join Event">
                                    <i className="fas fa-user-plus"></i> Join 
                                </button>
                                <button onClick={() => navigate(`/events/edit/${e.id}`)} className="btn btn-edit" title="Edit Event">
                                    <i className="fas fa-edit"></i> Edit
                                </button>
                                <button onClick={() => handleDeleteEvent(e.id)} className="btn btn-delete" title="Delete Event">
                                    <i className="fas fa-trash"></i> Delete
                                </button>
                            </div>
                        </div>
                        <p className="event-description">{e.description?.slice(0, 100)}...</p>
                        <div className="event-meta">
                            <span><i className = "fas fa-map-marker-alt"></i> {e.location} </span>
                            <span><i className = "fas fa-users"></i> Attendees: {e.attendees} </span>
                            <span><i className = "fas fa-calendar"></i> {new Date(e.time).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })} </span>
                            <span><i className = "fas fa-clock"></i> {new Date(e.time).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })} </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

