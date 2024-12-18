export default function FeatureDailyChallengeHeroGraphic() {
  return (
    <>
      <div
        className="
						bg-black-75 border border-black-50 h-96 w-72 absolute -top-40 right-80 
          	rounded-2xl backdrop-blur-sm
					"
      ></div>
      <div
        className="
						bg-black-75 border border-black-50 h-96 w-72 absolute top-64 right-80 
          	rounded-2xl backdrop-blur-sm z-20
					"
      ></div>
      <div
        className="
						bg-black-75 border border-black-50 h-96 w-72 absolute right-0 
          	rounded-2xl backdrop-blur-sm
					"
      ></div>
      <div
        className="
						bg-black-75 border border-black-50 h-96 w-72 absolute top-[26rem] right-0 
          	rounded-2xl backdrop-blur-sm
					"
      ></div>

      {/** gradient fade */}
      <div className="z-10 absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#000] to-transparent pointer-events-none"></div>
    </>
  );
}
