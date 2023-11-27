import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { loginUser, clearUser } from "../reducer/userSlice";
import {
  auth,
  updateEmail,
  appSignOut,
  crUser,
  updateProfile,
  updatePassword,
  deleteUser,
} from "../firebase";
import { IUser } from "../reducer/userType";

const UserEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // 타입지정하기
  const user = useSelector((state: IUser) => state.user);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  const [nickName, setNickName] = useState("");
  const [nameCheck, setNameCheck] = useState(false);
  useEffect(() => {
    setNickName(user.nickName);
    setEmail(user.email);
    setPw("");
    setPwCheck("");
  }, []);

  // 닉네임 중복 검사
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
  // 닉네임 검사 및 수정
  const nameUpdateFn = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!nickName) {
      return alert("닉네임을 입력하세요.");
    }
    if (!nameCheck) {
      return alert("닉네임 중복검사를 해주세요.");
    }
    //닉네임 업데이트
    if (crUser) {
      updateProfile(crUser, {
        displayName: nickName,
      })
        .then(() => {
          alert("닉네임을 변경하였습니다.");
          let body = {
            email: email,
            displayName: nickName,
            uid: user.uid,
          };
          axios
            .post("http://localhost:5000/api/user/update", body)
            .then((response) => {
              if (response.data.success) {
                alert("정보가 업데이트 되었습니다.");
                const userInfo = {
                  displayName: nickName,
                  uid: user.uid,
                  accessToken: user.accessToken,
                  email: email,
                };
                dispatch(loginUser(userInfo));
                setNickName(nickName);
              } else {
                alert("정보 업데이트가 실패하였습니다.");
              }
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error: any) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          alert("서버가 불안정하게 연결하였습니다.\n다시 로그인 해주세요.");
          appSignOut(auth);
          dispatch(clearUser(""));
          navigate("/login");
        });
    }
  };

  // 이메일 변경요청
  const emailUpdateFn = (e: React.MouseEvent) => {
    e.preventDefault();
    // 닉네임 검사 요청
    if (!email) {
      return alert("이메일을 입력하세요.");
    }

    // 이메일 변경 요청
    const crUser = auth.currentUser;
    if (crUser) {
      updateEmail(crUser, email)
        .then(() => {
          let body = {
            email: email,
            displayName: nickName,
            uid: user.uid,
          };
          axios
            .post("http://localhost:5000/api/user/update", body)
            .then((response) => {
              if (response.data.success) {
                alert("정보가 업데이트 되었습니다.");
                const userInfo = {
                  displayName: nickName,
                  uid: user.uid,
                  accessToken: user.accessToken,
                  email: email,
                };
                dispatch(loginUser(userInfo));
                setEmail(email);
              } else {
                alert("정보 업데이트가 실패하였습니다.");
              }
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          alert("서버가 불안정하게 연결하였습니다.\n다시 로그인 해주세요.");
          dispatch(clearUser(""));
          navigate("/login");
        });
    }
  };
  const passUpdateFn = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!pw) {
      return alert("비밀번호를 입력하세요.");
    }
    if (!pwCheck) {
      return alert("비밀번호 확인을 입력하세요.");
    }
    if (pw !== pwCheck) {
      return alert("비밀번호는 같아야 합니다.");
    }
    // firebase 비밀번호 변경 요청
    if (crUser) {
      updatePassword(crUser, pw)
        .then(() => {
          alert("비밀번호를 변경하였습니다.");
          setPw(pw);
          setPwCheck("");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          alert("서버가 불안정하게 연결하였습니다.\n다시 로그인 해주세요.");
          appSignOut(auth);
          dispatch(clearUser(""));
          navigate("/login");
        });
    }
  };

  // 회원 탈퇴
  const registOutFunc = (e: React.FormEvent) => {
    e.preventDefault();
    if (crUser) {
      deleteUser(crUser)
        .then(() => {
          let body = {
            uid: user.uid,
          };
          axios
            .post("http://localhost:5000/api/post/userout", body)
            .then((response) => {
              if (response.data.success) {
                alert("회원 탈퇴하였습니다.");
                dispatch(clearUser(""));
                navigate("/login");
              } else {
                console.log("회원정보 삭제 실패시에는 다시 저장을 도전한다.");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    }
  };

  return (
    <div className="p-6 m-4 shadow">
      <h2>User Info</h2>
      <form>
        <div className="flex justify-start mb-3">
          <label className="mr-5 text-xl ">닉네임</label>
          <input
            type="text"
            className="mr-5"
            required
            maxLength={20}
            minLength={3}
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
          />
          <button className="mr-5" onClick={(e) => nameCheckFn(e)}>
            닉네임 중복검사
          </button>
          <button onClick={(e) => nameUpdateFn(e)}>닉네임 변경</button>
        </div>
      </form>

      <form>
        <div className="flex justify-start mb-3">
          <label className="mr-5 text-xl">이메일</label>
          <input
            type="email"
            className="mr-5"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={(e) => emailUpdateFn(e)}>이메일 변경</button>
        </div>
      </form>
      <form>
        <div className="mb-3">
          <div className=" text-xl font-bold mb-3">비밀번호 변경</div>
          <div className="flex justify-start mb-3">
            <label className="mr-5 text-sm items-center ">비밀번호</label>
            <input
              type="password"
              className="mr-5"
              required
              maxLength={16}
              minLength={6}
              value={pw}
              onChange={(e) => setPw(e.target.value)}
            />
            <label className="mr-5 text-sm items-center ">비밀번호 확인</label>
            <input
              type="password"
              className="mr-5"
              required
              maxLength={16}
              minLength={6}
              value={pwCheck}
              onChange={(e) => setPwCheck(e.target.value)}
            />

            <button onClick={(e) => passUpdateFn(e)}>비밀번호 변경</button>
          </div>
        </div>
      </form>

      <div className="flex justify-start">
        <button onClick={(e) => registOutFunc(e)}>회원탈퇴</button>
      </div>
    </div>
  );
};

export default UserEdit;
