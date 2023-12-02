import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const Calendar = () => {
  const navigate = useNavigate();
  const [cateName, setCateName] = useState("");
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState([]);

  const cateGet = () => {
    axios
      .get("http://localhost:5000/api/cate/categet")
      .then((response) => {
        const cateData = response.data.categories;
        console.log("ca", cateData);
        setCategories(cateData);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const cateCt = () => {
    const data = {
      cateName: cateName,
    };
    axios
      .post("http://localhost:5000/api/cate/categories", data)
      .then((response) => {
        setMessage(response.data.message);
        console.log("res", response);
        cateGet();
      })
      .catch((error) => {
        console.error(error);
        setMessage("카테고리 생성 실패");
      });
  };

  useEffect(() => {
    cateGet();
  }, []);

  return (
    <>
      <article className="container m-auto">
        <div>
          <input
            type="text"
            placeholder="카테고리 이름"
            value={cateName}
            onChange={(e) => setCateName(e.target.value)}
          />
          <button onClick={cateCt}>카테고리 생성</button>
          <p>{message}</p>
        </div>
        <div>
          <h2>카테고리 목록</h2>
          {categories.map((v: any, i) => (
            <>
              <div className="ca" key={i}>
                {v.cateName}
              </div>
            </>
          ))}
        </div>
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
