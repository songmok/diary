import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { IUser } from "../reducer/userType";
import { ICate, ICategory } from "../reducer/cateType";
import { AppDispatch } from "../reducer/store";
import { fetchCate } from "../reducer/cateSlice";
import axios from "axios";

const List = () => {
  const dispatch = useDispatch<AppDispatch>();

  const params = useParams();
  const dateparms = params.id;
  const [listValue, setListValue] = useState("");
  const [listData, setListData] = useState([]);
  const cateData = useSelector((state: ICate) => state.cate.categories);
  const user = useSelector((state: IUser) => state?.user);

  const [cateState, setCateState] = useState("");

  const addListSumbit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let str = listValue.trim();
    if (str.length === 0) {
      alert("내용을 입력하세요.");
      setListValue("");
      return;
    }
    const addList = {
      listId: Date.now(),
      desc: listValue,
      completed: false,
      uid: user.uid,
      date: dateparms,
      category: cateState,
    };
    axios
      .post("http://localhost:5000/api/post/submit", { ...addList })
      .then((res) => {
        if (res.data.success) {
          setListValue("");
          alert("리스트가 등록되었습니다");
        } else {
          alert("등록에 실패했습니다");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("할 일 등록에 실패했습니다. 다시 시도해주세요.");
      });
  };
  // todoget redux 수정
  const listDateGet = () => {
    const getList = {
      params: {
        uid: user.uid,
        date: dateparms,
      },
    };
    axios
      .get(`http://localhost:5000/api/post/listDateGet`, getList)
      .then((res) => {
        console.log("rssse", res.data);
        setListData(res.data.initList);
      })
      .catch((err) => {
        console.log(err);
        return [];
      });
  };

  const formReset = (data: ICategory) => {
    if (cateState === "" || !listValue) {
      return;
    }

    if (cateState === data.cateName) {
      return;
    }

    const confirmed = window.confirm(
      "다른 카테고리로 넘어가면 기록된 정보가 초기화됩니다."
    );
    if (confirmed) {
      setListValue("");
    }
  };
  const formattedDate = `${dateparms?.substring(0, 4)}-${dateparms?.substring(
    4,
    6
  )}-${dateparms?.substring(6, 8)}`;
  useEffect(() => {
    dispatch(fetchCate());
    listDateGet();
  }, []);
  return (
    <article>
      <h1>{formattedDate} 입니다</h1>
      <Link to="/calendar">달력으로 돌아가기</Link>
      <h2>카테고리 목록</h2>
      {cateData.map((v: ICategory, i) => (
        <>
          <div
            key={v._id}
            onClick={() => {
              setCateState(v.cateName);
              formReset(v);
            }}
          >
            {v.cateName}
          </div>
          {cateState === v.cateName && (
            <form onSubmit={addListSumbit}>
              <input
                type="text"
                value={listValue}
                onChange={(e) => setListValue(e.target.value)}
                placeholder="할 일을 입력하세요"
              />
              <button type="submit">추가</button>
            </form>
          )}
        </>
      ))}
      {listData.map((v: any, i) => {
        return <div>{v.desc}</div>;
      })}
    </article>
  );
};
export default List;
