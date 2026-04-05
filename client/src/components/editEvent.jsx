import "../styles/editEvent.scss";
import eventAPI from "../API/eventAPI";

function EditEvent() {
    const [event, setEditEvent] = useState({
        title: "",
        location: "",
        description: "",
        attendees: 1,
        status: "Active"
    });

    const [isLoading, setIsLoading] = useState(false);

    const fetchEvent = async () => {
        const response = await eventAPI.getEvent(formData);
        setEditEvent(response.data);
    };

    useEffect(() => {
        fetchEvent();
    }, []);

    const handleCreateEventChange = (e) => {
        setEditEvent({
            ...event,
            [e.target.name]: e.target/value,
        });
    }; 

    const handleCreateEvent = async (e) => {
        setIsLoading(true);
        e.preventDefault();

        if (!event.title || !event.location || !event.description) {
            // error: missing fields
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
            const response = await eventAPI.updateEvent(formData);
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

export default EditEvent;