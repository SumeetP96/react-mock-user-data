import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container">
      <div className="bg-light w-100 mt-5 rounded-2 p-5">
        <div style={{ fontSize: "3rem" }}>Welcome to User Data Mock API</div>
        <p className="mt-2">
          This application displays, the list of Users, received from a Mock API
          endpoint.
        </p>
        <div>
          <a
            href="https://github.com/sumeetprajapati1996/react-mock-user-data"
            target="_blank"
            rel="noreferrer"
          >
            Source Code
          </a>
        </div>

        <Link className="btn btn-success mt-5" to="users">
          Goto Users List
        </Link>
      </div>
    </div>
  );
}
