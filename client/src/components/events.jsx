import React, { useEffect, useState } from "react";
import eventAPI from "../API/eventAPI";
import PropTypes from "prop-types";

Events.propTypes = {
    address: PropTypes.object.isRequired,
};

function Events() {
    const [events, setEvents] = useState([]);

    const fetchEvents = async () => {
        const event_res = await eventAPI.getEvents(address.latitude, address.longitude);
        setEvents(event_res.data);
    };

    useEffect(() => {
        fetchEvents();
    });

    return (
        // ...
    );
}

export default Events;