import "../styles/addEvent.scss";

function AddEvent() {
    const [event, setCreateEvent] = useState({
        title: "",
        location: "",
        description: "",
        attendees: 1,
        status: "Active"
    });

    const [isLoading, setIsLoading] = useState(false);

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

        if (!event.title || !event.location || !event.description) {
            console.log(error);
            setIsLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append("title", event.title);
        formData.append("location", event.location);
        formData.append("description", event.description);
        formData.append("attendees", event.attendees);
        formData.append("status", event.status);

        try {
            const response = await API.post("", formData);
            console.log(response.data);
            console.log("Event created");
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    return (
        // ...
    );
}

export default AddEvent;