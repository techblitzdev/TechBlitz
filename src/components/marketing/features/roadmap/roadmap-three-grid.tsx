import RoadmapGridItemOne from '@/components/marketing/features/roadmap/grid/roadmap-grid-item-one';
import RoadmapGridItemTwo from '@/components/marketing/features/roadmap/grid/roadmap-grid-item-two';

import FeaturesContentHeader from '@/components/marketing/features/global/content-header';
import HomepageHeroImages from '@/components/marketing/homepage/hero/hero-images';
import RoadmapImg from '../../../../public/images/roadmap.png';

const description = () => {
  return (
    <span>
      Every coding roadmap is created based on your current coding skills. We
      analyze your current skills set, and are able to create a roadmap that is
      tailored to you. Meaning every user will be getting a unique experience
      with TechBlitz.
    </span>
  );
};

export default function FeatureRoadmapThreeGridBlock() {
  const roadmapIframe =
    'https://customer-8s5ov2shcw99ezk2.cloudflarestream.com/ff823c820a5dc793c091f43ebae09d63/iframe?muted=true&poster=https%3A%2F%2Fcustomer-8s5ov2shcw99ezk2.cloudflarestream.com%2Fff823c820a5dc793c091f43ebae09d63%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600';

  return (
    <section className="py-16 px-4 md:pt-24 md:pb-32 flex flex-col gap-y-16">
      <FeaturesContentHeader
        title="Coding roadmaps for everyone"
        description={description()}
      />
      <div className="grid grid-cols-3 lg:grid-cols-12 gap-10 max-w-5xl self-center relative">
        <div
          aria-hidden="true"
          className="left-1/2 bottom-0 w-full center pointer-events-none absolute h-px max-w-full -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              'linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(255, 255, 255, 0.0) 0%, rgba(143, 143, 143, 0.67) 50%, rgba(0, 0, 0, 0) 100%)',
          }}
        ></div>
        <RoadmapGridItemOne />
        <RoadmapGridItemTwo />
      </div>
      {/** demo video */}
      <div className="lg:grid lg:grid-cols-12 gap-10 w-full max-w-5xl self-center">
        <div className="w-full lg:h-[35rem] rounded-lg lg:col-span-full">
          <HomepageHeroImages
            imageSrc={RoadmapImg}
            videoSrc={roadmapIframe}
            videoPoster="https://customer-8s5ov2shcw99ezk2.cloudflarestream.com/340defc1b25f5c2605e6533e8a015f2a/thumbnails/thumbnail.jpg?time=&height=600"
            fadeDirection="top"
          />
        </div>
      </div>
    </section>
  );
}
