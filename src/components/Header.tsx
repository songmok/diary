import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { IUser } from "../reducer/userType";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Header = () => {
  const user = useSelector((state: IUser) => state.user);
  const navigate = useNavigate();

  const logOutFn = () => {
    const comfirm = window.confirm("정말 로그아웃하시겠습니까?");
    if (comfirm) {
      signOut(auth)
        .then(() => {
          navigate("/login");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 mb-10 ">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link
            to={user.accessToken ? "/calendar" : "/login"}
            className="flex items-center"
          >
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              DIARY
            </span>
          </Link>
          <div className="flex items-center lg:order-2">
            {user.accessToken ? (
              <button
                className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2"
                onClick={() => {
                  logOutFn();
                }}
              >
                로그아웃
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2"
                >
                  로그인
                </Link>
                <Link
                  to="/signup"
                  className="text-gray-800 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600"
                >
                  회원가입
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
