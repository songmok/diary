import React from "react";
import { Link } from "react-router-dom";

// userslice 에 저장된 user 정보를 활용

const Header = () => {
  return (
    <header className="container m-auto p-5 bg-orange-200 rounded-2xl mt-5 mb-10">
      <div className="flex flex-wrap items-center justify-center lg:justify-start">
        <Link to="/" className="flex items-center mb-2 mb-lg-0">
          <h1>다이어리</h1>
        </Link>
        <ul className="flex flex-col lg:flex-row lg:ml-auto space-y-2 lg:space-y-0 lg:space-x-4">
          <li>
            <Link to="login" className="hover:underline">
              로그인
            </Link>
          </li>
          <li>
            <Link to="signup" className="hover:underline">
              회원가입
            </Link>
          </li>
          <li>
            <Link to="todo" className="hover:underline">
              Today
            </Link>
          </li>
          <li>
            <Link to="calendar" className="hover:underline">
              캘린더
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
