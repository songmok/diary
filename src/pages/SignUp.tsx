import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  auth,
  createUserWithEmailAndPassword,
  app,
  appSignOut,
  updateProfile,
} from "../firebase";
const SignUp = () => {
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  const [btRock, setBtRock] = useState(false);
  const navigate = useNavigate();
  //  firebase 회원가입 기능
  const registFunc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickName) {
      return alert("닉네임을 입력하세요");
    }
    if (!email) {
      return alert("이메일을 입력하세요");
    }
    if (!pw) {
      return alert("비밀번호를 입력하세요");
    }
    if (!pwCheck) {
      return alert("비밀번호 확인란 입력하세요");
    }
    if (pw !== pwCheck) {
      return alert("비밀번호는 같아야 합니다.");
    }
    if (!nameCheck) {
      return alert("닉네임 중복검사 해주시오");
    }
    if (pw !== pwCheck) {
      return alert("비밀번호는 같아야 합니다.");
    }
    if (!nameCheck) {
      return alert("닉네임 중복검사를 해주세요.");
    }
    // 연속 클릭 막기
    setBtRock(true);

    createUserWithEmailAndPassword(auth, email, pw)
      .then((userCredential: any) => {
        const user = userCredential.user;
        console.log(user);
        updateProfile(user, {
          displayName: nickName,
        }).then(() => {
          console.log(user);
          let body = {
            email: user.email,
            displayName: user.displayName,
            uid: user.uid,
          };
          axios
            .post("http://localhost:5000/api/user/register", body)
            .then((res) => {
              if (res.data.success) {
                appSignOut(auth);
                navigate("/login");
              } else {
                console.log("재시도");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        });
      })
      .catch((err) => {
        const errorCode = err.code;
        const errorMessage = err.message;
        console.log(errorCode, errorMessage);
      });
  };

  // 이름 중복 검사
  const [nameCheck, setNameCheck] = useState(false);
  const nameCheckFn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickName) {
      return alert("닉네임을 입력해주세요.");
    }
    const body = {
      displayName: nickName,
    };
    axios
      .post("http://localhost:5000/api/user/namecheck", body)
      .then((response) => {
        if (response.data.success) {
          if (response.data.check) {
            setNameCheck(true);
            alert("등록이 가능합니다.");
          } else {
            setNameCheck(false);
            alert("이미 등록된 닉네임입니다.");
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="p-6 m-4 shadow">
      <h2 className="text-2xl font-bold mb-4">SignUp</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700">닉네임</label>
          <input
            className="border border-gray-300 rounded-md p-2 w-full"
            type="text"
            required
            maxLength={20}
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
          onClick={(e) => nameCheckFn(e)}
        >
          닉네임 중복검사
        </button>
        <div className="mb-4">
          <label className="block text-gray-700">이메일</label>
          <input
            className="border border-gray-300 rounded-md p-2 w-full"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">비밀번호</label>
          <input
            className="border border-gray-300 rounded-md p-2 w-full"
            type="password"
            name="patternValue"
            maxLength={16}
            minLength={7}
            required
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          />
        </div>
        <div className="mb-4 ">
          <label className="block text-gray-700">비밀번호 확인</label>
          <input
            className="border border-gray-300 rounded-md p-2 w-full"
            type="password"
            required
            name="patternValue"
            maxLength={16}
            minLength={7}
            value={pwCheck}
            onChange={(e) => setPwCheck(e.target.value)}
          />
        </div>
        <button
          className={`bg-blue-500 text-white px-4 py-2 rounded-md ${
            btRock ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={btRock}
          onClick={(e) => registFunc(e)}
        >
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignUp;
