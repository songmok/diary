import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { auth, signInWithEmailAndPassword } from "../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const signInFunc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      return Swal.fire({
        title: "이메일을 입력하세요.",
        width: 600,
        padding: "3em",
        color: "#716add",
        backdrop: `
          rgba(0,0,123,0.4)
          url("/images/nyan-cat.gif")
          left top
          no-repeat
        `,
      });
    }
    if (!pw) {
      return alert("비밀번호를 입력하세요.");
    }
    signInWithEmailAndPassword(auth, email, pw)
      .then((userCredential) => {
        navigate("/calendar");
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === "auth/wrong-password") {
          setErrMsg("비밀번호를 확인해주세요.");
        } else if (errorCode === "auth/user-not-found") {
          setErrMsg("이메일을 확인해주세요.");
        } else {
          setErrMsg("로그인에 실패하였습니다.");
        }
      });
  };
  return (
    <div className="flex justify-center w-3/5 m-auto items-center">
      <div className="p-6 shadow container m-auto bg-red-400 rounded-2xl">
        <h2 className="text-2xl font-bold">로그인</h2>
        <form>
          <label className="block mt-4 text-slate-100 mb-3">이메일</label>
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <label className="block mt-4 text-slate-100 mb-3">비밀번호</label>
          <input
            type="password"
            required
            maxLength={8}
            value={pw}
            onChange={(event) => setPw(event.target.value)}
            className="block w-full px-4 py-2 mb-5 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {errMsg !== "" && <p className="mt-2 text-red-500">{errMsg}</p>}
          <div className="flex justify-center mb-2">
            <button
              onClick={(e) => signInFunc(e)}
              className="block px-12 py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              로그인
            </button>
            <button
              onClick={(event) => {
                event.preventDefault();
                navigate("/signup");
              }}
              className="block px-12 py-2 mt-4 ml-4 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
