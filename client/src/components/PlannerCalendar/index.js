import format from "date-fns/format";
import { Link } from "react-router-dom";
//import { useMutation } from "@apollo/client";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Auth from "../../utils/auth";

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

function PlannerCalendar() {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events);

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
  function handleUpdateEvent () {

  };

  function handleDeleteEvent() {

  };



  return (
    <div className="PlannerCalendar">
      {Auth.loggedIn() ? (
        <>
  
            <h2>Add New Event</h2>
            <div>
                <input type="text" placeholder="Add Title" style={{ width: "20%", marginRight: "10px"}} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                <DatePicker placeholderText="Start Date" style={{ marginRight: "10px"  }} selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
                <DatePicker placeholderText="End Date" selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} />
                <button style={{ marginTop: "10px" }} onClick={handleAddEvent}>
                    Add Event
                </button>
                <button style={{ marginTop: "10px" }} onClick={handleUpdateEvent}>
                    Update Event
                </button>
                <button style={{ marginTop: "10px" }} onClick={handleDeleteEvent}>
                    Delete Event
                </button>
                
            </div>
            <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50px" }} />
        </>
        ): (
          <div>
          <p>

          Welcome to The Big Event! </p>
          
          <p>Your personal 2023 planner</p>
          <p>Please{' '}

          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
        </div>
        )} 
       </div> 
  );
};

export default PlannerCalendar;
