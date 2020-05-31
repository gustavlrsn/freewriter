import Link from "next/link";

const css = {
  h2: "text-3xl text-gray-900 font-semibold mb-4 tracking-tight",
  p: "text-gray-700 font-light text-xl mb-4",
  a: "text-purple-800 hover:text-purple-900",
};

export default () => {
  return (
    <div>
      <h1 className="text-6xl font-bold text-center text-gray-900">
        Know Yourself.
      </h1>
      <span className="text-3xl text-gray-700 text-center block mb-6">
        Experience the magic of freewriting. <br /> Write every day, without
        stopping to judge or edit.
      </span>
      <img src="/img/demo.gif" className="rounded-md shadow-md mb-8" />

      {/* <div className="flex justify-center mb-8">
        <Link href="/signup">
          <a className="btn">Sign up, it's free!</a>
        </Link>
      </div> */}

      {/* <h2 className="text-center text-purple-800 font-semibold uppercase">
        Why?
      </h2>

      <div className="flex mb-8">
        <img src="/avatars/jung.png" className="w-32 h-32 rounded-full mr-4" />
        <div>
          <h4 className="text-2xl font-semibold text-gray-900">Get unstuck</h4>
          <p className="text-gray-800 text-xl font-light">
            Freewriting can help you get past blocks & gain new insights.
          </p>
        </div>
      </div>

      <div className="flex mb-8">
        <img src="/avatars/watts.png" className="w-32 h-32 rounded-full mr-4" />
        <div>
          <h4 className="text-2xl font-semibold text-gray-900">
            Clear your mind
          </h4>
          <p className="text-gray-800 text-xl font-light">
            Freewriting allows you to dump thoughts and get them out of your
            mind.
          </p>
        </div>
      </div>

      <div className="flex mb-8">
        <img src="/avatars/dali.png" className="w-32 h-32 rounded-full mr-4" />
        <div>
          <h4 className="text-2xl font-semibold text-gray-900">
            Exercise your creativity
          </h4>
          <p className="text-gray-800 text-xl font-light">
            Explore ideas, thoughts and feelings, and become a better writer in
            the process.
          </p>
        </div>
      </div>

      <div className="flex mb-8">
        <img
          src="/avatars/nietzsche.png"
          className="w-32 h-32 rounded-full mr-4"
        />
        <div>
          <h4 className="text-2xl font-semibold text-gray-900">
            A cornerstone habit
          </h4>
          <p className="text-gray-800 text-xl font-light">
            Stay on track by keeping in contact with yourself, your values and
            priorites.
          </p>
        </div>
      </div> */}
      <div className="px-12">
        <h2 className={css.h2}>
          Just write whatever comes to mind without stopping to judge, correct
          or edit.
        </h2>
        <p className={css.p}>
          It was Julia Cameron who first popularized the practice of morning
          pages, three pages of whatever crosses your mind, in{" "}
          <a
            className={css.a}
            href="https://www.amazon.com/Artists-Way-Julia-Cameron/dp/1585421464"
            target="_blank"
          >
            The Artist's Way: A Spiritual Path to Higher Creativity
          </a>
          . It is simple, just write whatever crosses your mind without stopping
          to judge, correct or edit.
        </p>
        <h2 className={css.h2}>Set a daily goal and write every day.</h2>
        <p className={css.p}>
          You choose your own goal. Julia Cameron recommended three pages which
          roughly translates to 750 words. We recommend at least 500 words as a
          daily goal.
        </p>
        <h2 className={css.h2}>Nothing is saved.</h2>
        <p className={css.p}>
          When you click{" "}
          <button className="border text-sm border-indigo-darker text-indigo-darker hover:text-white hover:bg-indigo-darker transition-colors duration-100 rounded px-3 py-2 rounded-full focus:outline-none focus:shadow-outline">
            Let it go
          </button>
          , only the amount of words you wrote is saved. What you write never
          touches our server or database, giving you complete privacy and a safe
          space for your thoughts.
        </p>
        <p className={css.p}>
          You do have the option to save as .txt and copy to clipboard, if you
          still would like to keep what you have written.
        </p>
        {/* <p className={`${css.p} text-center mt-4`}>
          More questions?{" "}
          <Link href="/faq">
            <a className={css.a}>Visit the FAQ.</a>
          </Link>
        </p> */}
      </div>

      <p className="text-center mt-16 font-light text-gray-800">
        Made by{" "}
        <a
          className={css.a}
          href="https://twitter.com/gustavlrsn"
          target="_blank"
        >
          @gustavlrsn
        </a>
      </p>
    </div>
  );
};
