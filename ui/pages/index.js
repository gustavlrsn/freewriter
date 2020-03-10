import TextareaAutosize from "react-textarea-autosize";

// TODO:
// hide navbar?
// hide autoscroll?

export default ({ currentUser, fadeHeader }) => {
  const onKeyDown = e => {
    console.log({ e });
    console.log("fade header if not already faded.");
    fadeHeader();
  };
  return (
    <div className="text">
      <TextareaAutosize
        onKeyDown={onKeyDown}
        placeholder="Write it out..."
        autoFocus
        className="writearea"
      />
      <style jsx global>{`
        .writearea {
          position: relative;
          resize: none;
          border: 1px solid rgba(255, 255, 255, 0);
          outline: none;
          /* color: #000; */
          background: rgba(0, 0, 0, 0);
          width: 100%;
          text-align: left;
          font-size: 20px;
          font-weight: 400 !important;
          word-wrap: break-word !important;
          padding: 0px 0px 150px 0px;
          /* overflow:hidden !important; */
          display: inline-block;
          min-height: 300px;
          z-index: 0;
        }
      `}</style>
    </div>
  );
};
