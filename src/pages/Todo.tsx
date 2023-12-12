import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { IUser } from "../reducer/userType";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ICate, ICategory } from "../reducer/cateType";
const Todo = () => {
  const params = useParams();
  const dateparms = params.id;
  const [todoValue, setTodoValue] = useState("");

  const cateData = useSelector((state: ICate) => state.cate.categories);
  const user = useSelector((state: IUser) => state?.user);
  const addTodoSubmit = (event: any) => {
    event.preventDefault();
    let str = todoValue.trim();
    if (str.length === 0) {
      alert("내용을 입력하세요.");
      setTodoValue("");
      return;
    }
    const addTodo = {
      id: Date.now(),
      desc: todoValue,
      completed: false,
      uid: user.uid,
      date: dateparms,
      category: "",
    };
    axios
      .post("http://localhost:5000/api/post/submit", { ...addTodo })
      .then((res) => {
        if (res.data.success) {
          setTodoValue("");
          // 목록 재호출
          // getList("", 0);
          alert("할 일이 등록되었습니다");
        } else {
          alert("할 일이 등록되지 않았습니다");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const formattedDate = `${dateparms?.substring(0, 4)}-${dateparms?.substring(
    4,
    6
  )}-${dateparms?.substring(6, 8)}`;
  return (
    <article>
      <h1>{formattedDate} 입니다</h1>

      <Link to="/calendar">달력으로 돌아가기</Link>
      <h2>카테고리 목록</h2>
      {cateData.map((v: ICategory, i) => (
        <>
          <div className="" key={v._id}>
            {v.cateName}
          </div>
        </>
      ))}

      <ReactQuill onChange={addTodoSubmit} />
    </article>
  );
};
export default Todo;
