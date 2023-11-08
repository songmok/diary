import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const SignUp = () => {
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  //  연속버튼 막기 변수
  const [btFlag, setBtFlag] = useState(false);
  const navigate = useNavigate();

  //  firebase 회원가입 기능

  return (
    <div className="p-6 m-4 shadow">
      <h2>SignUp</h2>
      <form>
        <label>닉네임</label>
        {/* <input
            type="text"
            required
            maxLength={20}
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
          /> */}
        {/* <button onClick={(e) => nameCheckFn(e)}>닉네임 중복검사</button> */}
        <label>이메일</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>비밀번호</label>
        <input
          type="password"
          name="patternValue"
          maxLength={16}
          minLength={7}
          required
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        />
        <label>비밀번호 확인</label>
        <input
          type="password"
          required
          name="patternValue"
          maxLength={16}
          minLength={7}
          value={pwCheck}
          onChange={(e) => setPwCheck(e.target.value)}
        />
        {/* <button
            disabled={btFlag}
            onClick={(e) => {
              registFunc(e);
            }}
          >
            회원가입
          </button> */}
      </form>
    </div>
  );
};

export default SignUp;
