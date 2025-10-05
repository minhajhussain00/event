import axios from "axios";


export const load = async (event) => {
    
    const fetchedEvents = await axios.get(`${event.url.origin}/api/event/getEvents`)

    return {
        events: fetchedEvents.data
    };
};
