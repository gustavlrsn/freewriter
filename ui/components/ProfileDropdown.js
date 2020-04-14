import React, { useEffect } from "react";
import { modals } from "./Modal";

const ProfileDropdown = ({ currentUser, logOut, openModal }) => {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Esc" || e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="z-20 relative block h-10 w-10 rounded-full overflow-hidden focus:outline-none focus:shadow-outline"
      >
        <img
          className="h-full w-full"
          src={`/avatars/${currentUser.avatar}.png`}
          alt={currentUser.username}
        />
      </button>

      {open && (
        <>
          <button
            onClick={() => setOpen(false)}
            tabIndex="-1"
            className="z-10 fixed inset-0 h-full w-full cursor-default"
          ></button>
          <div className="z-20 absolute right-0 w-48 mt-2 p-2 bg-white rounded-lg shadow-xl flex flex-col animation-fade-in animation-200ms animation-once">
            <button
              onClick={() => {
                setOpen(false);
                openModal({
                  type: modals.EDIT_PROFILE,
                });
              }}
              className="block px-2 py-1 text-left text-gray-800 hover:bg-gray-200 rounded-lg focus:outline-none focus:bg-gray-200"
            >
              Edit profile
            </button>
            <a
              href="#"
              className="block px-2 py-1 text-gray-800 hover:bg-gray-200 rounded-lg focus:outline-none focus:bg-gray-200"
            >
              Manage subscription
            </a>
            <a
              href="#"
              onClick={logOut}
              className="block px-2 py-1 text-gray-500 hover:bg-gray-200 rounded-lg focus:outline-none focus:bg-gray-200"
            >
              Sign out
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileDropdown;
