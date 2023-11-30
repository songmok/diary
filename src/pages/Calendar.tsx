import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Navigate, useNavigate } from "react-router-dom";

const Calendar = () => {
  // 해당 부분 컴포넌트 때어내기
  const navigate = useNavigate();
  return (
    <>
      <article className="container m-auto">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "title",
            right: "prevYear,prev,today,next,nextYear",
          }}
          eventClick={(e) => {}}
          initialView="dayGridMonth"
          events={""}
          droppable={false}
          defaultAllDay={false}
          editable={true}
          selectable={false}
          dateClick={(data) => {
            const todayData = data.dateStr;
            navigate(`/${todayData}`);
          }}
          selectMirror={false}
          displayEventTime={false}
          weekends={true}
          locale={"ko"}
          eventStartEditable={false}
          height={"85vh"}
        />
      </article>
    </>
  );
};

export default Calendar;
