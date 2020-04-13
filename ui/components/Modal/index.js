import { useEffect } from "react";
import { Close as CloseIcon } from "../Icons";
import WelcomeAndSetTimezone from "./WelcomeAndSetTimezone";
import FinishedWriting from "./FinishedWriting";

export const modals = {
  FINISHED_WRITING: "FINISHED_WRITING",
  WELCOME_AND_SET_TIMEZONE: "WELCOME_AND_SET_TIMEZONE",
};

const components = {
  FINISHED_WRITING: FinishedWriting,
  WELCOME_AND_SET_TIMEZONE: WelcomeAndSetTimezone,
};

export function Modal({ modal, closeModal, showCloseButton = true }) {
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
      <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-20">
        <button
          onClick={() => {
            if (!modal.hideCloseButton) closeModal();
          }}
          tabIndex="-1"
          className="absolute top-0 left-0 w-screen h-screen cursor-default bg-black opacity-50 animation-fade-in animation-ease-out animation-200ms animation-once z-10"
        ></button>
        <div className="bg-white rounded-lg p-8 z-50 absolute shadow animation-fade-in animation-ease-out animation-200ms animation-once">
          <ModalComponent closeModal={closeModal} {...modal.props} />
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
    </>
  );
}
