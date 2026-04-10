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

    return (
        <section className="py-4">
            <div className="container">
                <div className="row g-4">
                    <div className="col-12">
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
                                <div className="table-responsive border-0">
                                    <table className="table align-middle p-4 mb-0 table-hover table-shrink">
                                        <tbody className="border-top-0">
                                            {events?.map((e) => (
                                                <tr key={e.id}>
                                                    <td>
                                                        <h6 className="mb-0">{e.title}</h6>
                                                        <small className="text-muted">{e.description?.slice(0, 60)}...</small>
                                                    </td>
                                                    <td>{e.location}</td>
                                                    <td>{e.attendees}</td>
                                                    <td>{new Date(e.date).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}</td>
                                                    <td>{new Date(e.date).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</td>
                                                    <td>
                                                        <div className="d-flex gap-2">
                                                            <Link to={`/events/edit/${e.id}`} className="btn btn-primary btn-round mb-0" title="Edit">
                                                                <i className="bi bi-pencil-square" />
                                                            </Link>
                                                            <button onClick={() => handleDeleteEvent(e.id)} className="btn btn-danger btn-round mb-0" title="Delete">
                                                                <i className="bi bi-trash" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

