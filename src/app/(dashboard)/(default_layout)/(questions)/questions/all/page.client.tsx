'use client';
import Hero from '@/components/global/hero';

export default function ClientPage({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Hero
        heading="All Questions"
        subheading=" Explore a diverse set of questions across multiple topics to enhance
          your knowledge."
      />
      {children}
    </div>
  );
}
