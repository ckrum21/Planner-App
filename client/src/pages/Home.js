import React from 'react';
import { useQuery } from '@apollo/client';

import PlannerCalendar from '../components/PlannerCalendar';

import { QUERY_EVENTS } from '../utils/queries';

const Home = () => {
    const { loading, data } = useQuery(QUERY_EVENTS);
    const events = data?.events || [];
  
    return (
      <main>
       <div className="flex-row justify-center">
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <PlannerCalendar
              events={events}
              title="test"
            />
          )}
        </div>
      </div>
      </main>
    );
  };
  
  export default Home;
  