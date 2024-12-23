export function LeftSectionTwo() {
  return (
    <div className="flex flex-col gap-y-6">
      <h2 className="text-2xl lg:text-4xl !font-onest !leading-[normal] text-gradient from-white to-white/55">
        LEFT SIDE CONTENT
      </h2>
    </div>
  );
}

export function RightSectionTwo() {
  return (
    <div className="flex flex-col gap-y-6">
      <h2 className="text-2xl lg:text-4xl !font-onest !leading-[normal] text-gradient from-white to-white/55">
        Coding at your convenience.
      </h2>
      <p className="text-white/70 max-w-xl text-base font-onest">
        Unable to get to a computer? No problem. TechBlitz questions can be
        completed from the comfort of your phone, enabling you to learn on the
        go.
      </p>
    </div>
  );
}
