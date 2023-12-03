import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IUser } from "../reducer/userType";
import axios from "axios";
const Todo = () => {
  const params = useParams();
  const { dateparms } = params;

  const [todoValue, setTodoValue] = useState("");
  const user = useSelector((state: IUser) => state.user);
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
  return (
    <div>
      <h1>Todo {dateparms}</h1>
      <div>
        <form className="flex pt-2" onSubmit={addTodoSubmit}>
          <input
            type="text"
            placeholder="할 일을 입력하세요"
            className="w-full px-3 py-2 mr-4 text-gray-500 border rounded shadow"
            value={todoValue}
            // onChange={changeTodoValue}
          ></input>
          <input
            type="submit"
            // onClick={addTodo}
            // onSubmit={addTodo}
            className="p-2 text-blue-400 border-2 border-blue-400 rounded hover:text-white hover:bg-blue-400"
          ></input>
        </form>
      </div>
    </div>
  );
};
export default Todo;
