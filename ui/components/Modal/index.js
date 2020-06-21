import { useEffect } from "react";
import { Close as CloseIcon } from "../Icons";
import WelcomeAndSetTimezone from "./WelcomeAndSetTimezone";
import FinishedWriting from "./FinishedWriting";
import EditProfile from "./EditProfile";

export const modals = {
  EDIT_PROFILE: "EDIT_PROFILE",
  FINISHED_WRITING: "FINISHED_WRITING",
  WELCOME_AND_SET_TIMEZONE: "WELCOME_AND_SET_TIMEZONE",
};

const components = {
  EDIT_PROFILE: EditProfile,
  FINISHED_WRITING: FinishedWriting,
  WELCOME_AND_SET_TIMEZONE: WelcomeAndSetTimezone,
};

export function Modal({ modal, closeModal, currentUser }) {
  if (!modal) return null;
  const ModalComponent = components[modal.type];

  useEffect(() => {
    const handleEscape = (e) => {
      if ((e.key === "Esc" || e.key === "Escape") && !modal.hideCloseButton) {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <>
      <div className="block fixed top-0 left-0 overflow-x-hidden overflow-y-auto w-full h-full z-20">
        <button
          onClick={() => {
            if (!modal.hideCloseButton) closeModal();
          }}
          tabIndex="-1"
          className="fixed top-0 left-0 w-screen bottom-0 cursor-default bg-black opacity-50 animation-fade-in animation-ease-out animation-200ms animation-once z-10"
        ></button>
        <div className="mx-auto min-h-full max-w-screen-md flex items-center justify-center relative">
          <div className=" bg-white relative rounded-lg p-8 m-4 z-50 shadow animation-fade-in animation-ease-out animation-200ms animation-once">
            <ModalComponent
              closeModal={closeModal}
              currentUser={currentUser}
              {...modal.props}
            />
            {!modal.hideCloseButton && (
              <button
                onClick={closeModal}
                tabIndex="1"
                className="absolute top-0 right-0 mr-2 mt-2 p-2 text-gray-600 hover:bg-gray-200 rounded-full focus:outline-none focus:shadow-outline"
              >
                <CloseIcon className="h-6 w-6" />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
