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
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "title",
          right: "prevYear,prev,today,next,nextYear",
        }}
        eventClick={(e) => {}}
        initialView="dayGridMonth"
        events={
          // 정보전달
          ""
        }
        droppable={false}
        defaultAllDay={false}
        editable={true}
        selectable={false}
        dateClick={(data) => {
          // 해당 date 정보를 url로 전송
          navigate("/");
        }}
        selectMirror={false}
        displayEventTime={false}
        weekends={true}
        locale={"ko"}
        eventStartEditable={false}
        height={"85vh"}
      />
    </>
  );
};

export default Calendar;
