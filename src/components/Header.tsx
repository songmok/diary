import React from "react";
import { Link } from "react-router-dom";

// userslice 에 저장된 user 정보를 활용

const Header = () => {
  return (
    <header className="p-3 ">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <Link
            to="/"
            className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
          >
            TODO 웹서비스
          </Link>
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <Link to="/" className="nav-link px-2 text-secondary">
                Home
              </Link>
            </li>
            <li>
              <Link to="login" className="nav-link px-2 ">
                로그인
              </Link>
            </li>
            <li>
              <Link to="singup" className="nav-link px-2 ">
                회원가입
              </Link>
            </li>
            <li>
              <Link to="todo" className="nav-link px-2 ">
                Todo
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
