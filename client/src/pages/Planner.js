import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React  from "react";
import {dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const locales = {
    "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const events = [

];

function Planner() {
    const [newEvent, setNewEvent] = ({ title: "", start: "", end: "" });
    
    const [allEvents, setAllEvents] = (events);

    handleCloseAdd = () => this.setState({showAdd: false});
    handleCloseEdit = () => this.setState({showEdit: false});
    handleShowEdit = ({_id, start, end}) => this.setState({eventid: _id, start: start, end: end, showEdit: true});

    const editEvent = (event) => {
        setIsLoading(true)
        setShowingEventForm({ visible: false })
    
        setTimeout(() => {
          const parsedEvent = parseEvents([event])
          
          const updatedEvents = [...events].map(updatedEvent => {
            return updatedEvent.id === event.id ? parsedEvent[0] : updatedEvent
          })
    
          setEvents(updatedEvents)
          setIsLoading(false)
          showFeedback({ message: "Event edited successfully", type: "success" })
        }, MOCK_LOADING_TIME)
      }






    function handleAddEvent() {
        
        for (let i=0; i<allEvents.length; i++){

            const d1 = new Date (allEvents[i].start);
            const d2 = new Date(newEvent.start);
            const d3 = new Date(allEvents[i].end);
            const d4 = new Date(newEvent.end);
      /*
          console.log(d1 <= d2);
          console.log(d2 <= d3);
          console.log(d1 <= d4);
          console.log(d4 <= d3);
            */

             if (
              ( (d1  <= d2) && (d2 <= d3) ) || ( (d1  <= d4) &&
                (d4 <= d3) )
              )
            {   
                alert("CLASH"); 
                break;
             }
    
        }
        
        
        setAllEvents([...allEvents, newEvent]);
    }
    
    return (
        <div className="Planner">
            <h1>Planner App</h1>
            <h2>Add New Event</h2>
            <div>
                <input type="text" placeholder="Add Title" style={{ width: "20%", marginRight: "10px" }} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                <DatePicker placeholderText="Start Date" style={{ marginRight: "10px" }} selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
                <DatePicker placeholderText="End Date" selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} />
                <button stlye={{ marginTop: "10px" }} onClick={handleAddEvent}>
                    Add Event
                </button>
                
            </div>
            <Planner localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50px" }} />
        </div>
    );
}

export default Planner;