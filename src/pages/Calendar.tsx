import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchCate } from "../reducer/cateSlice";
import { AppDispatch } from "../reducer/store";
import { IUser } from "../reducer/userType";
import { ICate, ICategory } from "../reducer/cateType";

const Calendar = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchCate());
  }, []);
  const cateData = useSelector((state: ICate) => state.cate.categories);
  const user = useSelector((state: IUser) => state?.user);
  const navigate = useNavigate();
  const [cateName, setCateName] = useState("");
  const [message, setMessage] = useState("");

  const cateCt = () => {
    const data = {
      cateName: cateName,
      uid: user.uid,
    };
    axios
      .post("http://localhost:5000/api/cate/categories", data)
      .then((response) => {
        setMessage(response.data.message);
        dispatch(fetchCate());
      })
      .catch((error) => {
        console.error(error);
        setMessage("카테고리 생성 실패");
      });
  };

  return (
    <>
      <div>
        {cateData ? (
          <article className="container m-auto">
            <div>
              <input
                type="text"
                placeholder="카테고리 이름"
                onChange={(e) => setCateName(e.target.value)}
              />
              <button onClick={cateCt}>카테고리 생성</button>
              <p>{message}</p>
            </div>
            <div>
              <h2>카테고리 목록</h2>
              {cateData.map((v: ICategory, i) => (
                <>
                  <div className="ca" key={v._id}>
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
                const today = todayData.replace(/-/g, "");
                navigate(`todo/${today}`, { replace: true });
              }}
              selectMirror={false}
              displayEventTime={false}
              weekends={true}
              locale={"ko"}
              eventStartEditable={false}
              height={"85vh"}
            />
          </article>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Calendar;
