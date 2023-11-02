import React from "react";

function UserInfor() {
  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-8 bg-zince-300 flex flex-col gap-2 my-6">
        <div>
          Name: <span className="font-bold">Jhone</span>
        </div>
        <div>
          Email: <span className="font-bold">Jhone@gmail.com</span>
        </div>
        <button className="bg-red-500 text-white font-bold px-6 py-2 mt-3">
          Log out
        </button>
      </div>
    </div>
  );
}

export default UserInfor;
