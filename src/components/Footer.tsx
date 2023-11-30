import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 mt-10">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link
            to="https://songmok.site/"
            className="text-sm text-gray-100 sm:text-cente"
            target="blank"
          >
            SONGMOK
          </Link>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
            <Link to="#" className="text-gray-500 hover:text-gray-900 pr-2">
              노션
            </Link>
            <Link to="#" className="text-gray-500 hover:text-gray-900 ">
              깃허브
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
