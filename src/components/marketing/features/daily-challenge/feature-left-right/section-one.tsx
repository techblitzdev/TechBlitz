/**
 * The first section with the text on the left
 * and the illustration on the right
 */
export function LeftSectionOne() {
  return (
    <div className="flex flex-col gap-y-6">
      <h2 className="text-2xl lg:text-4xl !font-onest !leading-[normal] text-gradient from-white to-white/55">
        Software simplified.
      </h2>
      <p className="text-white/70 max-w-xl text-base font-onest ">
        Our daily challenges are designed to be challenging, but not take up too
        much of your time. TechBlitz ensures you get the most out of your
        learning experience.
      </p>
    </div>
  );
}

export function RightSectionOne() {
  return (
    <div className="flex flex-col gap-y-6">
      <h2 className="text-2xl lg:text-4xl !font-onest !leading-[normal] text-gradient from-white to-white/55">
        RIGHT SIDE CONTENT
      </h2>
    </div>
  );
}
