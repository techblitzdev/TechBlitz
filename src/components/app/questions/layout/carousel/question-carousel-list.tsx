import { Suspense } from 'react';
import { getQuestionsByTag } from '@/utils/data/questions/get-questions-by-tag';
import QuestionCarousel from './question-carousel';
import QuestionCarouselCard from './question-carousel-card';
import { CarouselItem } from '@/components/ui/carousel';
import QuestionCarouselLoading from './question-carousel-loading';
import { QuestionDifficulty } from '@/types/Questions';

const questionsCarousels = [
  {
    tag: [],
    title: 'Beginner Questions',
    description:
      'Learn the basics of programming with these beginner questions.',
    image: '/images/beginner.png',
    difficulty: 'BEGINNER' as QuestionDifficulty,
  },
  {
    tag: ['javascript', 'JavaScript', 'javaScript', 'generators'],
    title: 'Javascript Questions',
    description:
      'Learn how to use JavaScript to build more efficient and scalable applications.',
    image: '/images/javascript.png',
  },
  {
    tag: ['react'],
    title: 'React Questions',
    description: 'Explore the most popular JavaScript framework, React.',
    image: '/images/react.png',
  },
  {
    tag: ['react-hooks'],
    title: 'React Hooks',
    description:
      'Learn how to use React Hooks to build more efficient and scalable applications.',
    image: '/images/react.png',
  },
  {
    tag: ['arrays', 'Array', 'array-methods'],
    title: 'Arrays',
    description: 'Learn all the key concepts of arrays in JavaScript.',
    image: '/images/arrays.png',
  },
  {
    tag: ['async', 'promises'],
    title: 'Asynchronous Programming',
    description: 'Learn how to handle asynchronous operations in JavaScript.',
    image: '/images/async.png',
  },
];

export default function QuestionsCarouselList() {
  return (
    <div className="flex flex-col gap-y-16 md:gap-y-28 pt-10">
      {questionsCarousels.map((carousel, index) => (
        <Suspense
          key={`carousel-${index}-${carousel.tag.join('-')}-${carousel.title}`}
          fallback={<QuestionCarouselLoading />}
        >
          <QuestionCarousel
            heading={carousel.title}
            description={carousel.description}
            image={carousel.image}
            tag={carousel.tag}
            difficulty={carousel.difficulty}
          >
            <QuestionCarouselContent
              tag={carousel.tag}
              difficulty={carousel.difficulty}
            />
          </QuestionCarousel>
        </Suspense>
      ))}
    </div>
  );
}

async function QuestionCarouselContent({
  tag,
  difficulty,
}: {
  tag: string[];
  difficulty?: QuestionDifficulty;
}) {
  const questions = await getQuestionsByTag(tag, difficulty);
  const flattenedQuestions = questions.flatMap((q) =>
    q.questions.map((question) => ({
      ...question.question,
      userAnswers: question.question.userAnswers,
    }))
  );

  return (
    <>
      {flattenedQuestions.map((question, index) => (
        <CarouselItem key={`${question.uid}-${index}`} className="flex">
          <QuestionCarouselCard
            questionData={{
              ...question,
              userAnswers: question.userAnswers || [],
            }}
          />
        </CarouselItem>
      ))}
    </>
  );
}
