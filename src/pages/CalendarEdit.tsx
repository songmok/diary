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

const CalendarEdit = () => {
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
      cateId: Date.now(),
      cateName: cateName,
      uid: user.uid,
    };
    axios
      .post("http://localhost:5000/api/cate/categories", data)
      .then((response) => {
        dispatch(fetchCate());
      })
      .catch((error) => {
        console.error(error);
        setMessage("카테고리 생성 실패");
        alert(message);
      });
  };
  const cateDelete = (id: string) => {
    axios
      .delete("http://localhost:5000/api/cate/delete", { data: { id } })
      .then((response) => {
        console.log(response.data);
        dispatch(fetchCate());
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <article className="container m-auto flex flex-col xl:flex-row">
        <div className="w-full xl:w-1/4 flex flex-col items-center space-y-4">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="카테고리 이름"
              className="border-2 border-gray-400 rounded-lg px-4 py-2 w-full md:w-72"
              onChange={(e) => setCateName(e.target.value)}
            />
            <input
              type="button"
              value="생성"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded ml-2"
              onClick={cateCt}
            />
          </div>
          <div className="w-full">
            <h2 className="text-xl font-bold mb-4">카테고리 목록</h2>
            {cateData.map((v: ICategory, i) => (
              <div
                className="flex items-center justify-between bg-gray-100 p-4 rounded-lg mb-4"
                key={v._id}
              >
                <span>{v.cateName}</span>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    cateDelete(v._id);
                  }}
                >
                  삭제
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full xl:w-3/4">
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
              navigate(`list/${today}`, { replace: true });
            }}
            selectMirror={false}
            displayEventTime={false}
            weekends={true}
            locale={"ko"}
            eventStartEditable={false}
            height={"85vh"}
          />
        </div>
      </article>
    </>
  );
};

export default CalendarEdit;
