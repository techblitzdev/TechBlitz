import { Grid } from '@/components/ui/grid';

export default function QuestionsAllHero() {
  return (
    <section className="w-full pt-7 pb-4 group relative">
      <div className="container flex flex-col gap-y-3 z-10">
        <h1 className="text-3xl text-wrap text-start font-inter">
          All Questions
        </h1>
        <h6 className="text-sm text-gray-400 font-inter max-w-md">
          Explore a diverse set of questions across multiple topics to enhance
          your knowledge.
        </h6>
      </div>
      <Grid
        size={25}
        position="bottom-left"
      />

      {/* Fade-out gradient overlay */}
      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#000000] to-transparent pointer-events-none"></div>
    </section>
  );
}
