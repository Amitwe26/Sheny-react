import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

export function CalendarPriview({ activeBoard, groups }) {
  const [events, setEvents] = useState([]);
  const localizer = momentLocalizer(moment);
  const style = {
    height: '70vh',
    width: '90%',
    margin: '0 auto',
  };

  useEffect(() => {
    getDate();
  }, [groups]);

  const getDate = () => {
    const arr = groups.map((group) => {
      return group.tasks.map((task, idx) => {
        const yearStart = new Date(task.dateRange.startDate).getFullYear();
        const monthStart = new Date(task.dateRange.startDate).getMonth();
        const dayStart = new Date(task.dateRange.startDate).getDate();

        const yearEnd = new Date(task.dateRange.endDate).getFullYear();
        const monthEnd = new Date(task.dateRange.endDate).getMonth();
        const dayEnd = new Date(task.dateRange.endDate).getDate();

        const dateTask = {
          id: idx,
          start: new Date(yearStart, monthStart, dayStart),
          end: new Date(yearEnd, monthEnd, dayEnd),
          title: task.name,
        };
        return dateTask;
      });
    });
    setEvents(arr.flat());
  };
  return (
    <div>
      <Calendar
        localizer={localizer}
        defaultDate={new Date()}
        defaultView='month'
        events={events}
        style={style}
      />
    </div>
  );
}
