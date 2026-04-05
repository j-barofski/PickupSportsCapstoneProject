import React, { useEffect, useState } from "react";

function Events() {
    const [events, setEvents] = useState([]);

    const fetchEvents = async () => {
        const event_res = await API.get("");
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