import fromMsToMinutes from "../../utils/fromMsToMinutes";

const FinishedWriting = ({
  number_of_words,
  elapsed_time,
  unlocks,
  new_streak,
}) => {
  return (
    <div className="">
      <h3 className="text-3xl text-center">
        Boom!
        <br /> You wrote <strong>{number_of_words} words</strong> in{" "}
        <strong>{fromMsToMinutes(elapsed_time)}</strong> minutes
        <br /> ({new_streak} day streak)
      </h3>
      <div className="flex mt-4 justify-center">
        {unlocks.map((unlock) => (
          <img
            key={unlock}
            src={`/achievements/${unlock}.png`}
            className="w-25 h-25 m-2"
          />
        ))}
      </div>
    </div>
  );
};

export default FinishedWriting;
