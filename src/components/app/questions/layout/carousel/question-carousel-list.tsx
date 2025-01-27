import { Suspense } from 'react';
import { getQuestionsByTag } from '@/utils/data/questions/get-questions-by-tag';
import QuestionCarousel from './question-carousel';
import QuestionCarouselCard from './question-carousel-card';
import { CarouselItem } from '@/components/ui/carousel';
import QuestionCarouselLoading from './question-carousel-loading';
import { QuestionDifficulty, QuestionType } from '@/types/Questions';
import { UserRecord } from '@/types/User';

const questionsCarousels = [
  {
    tag: [],
    title: 'JavaScript Fundamentals',
    description: 'Learn the basics of JavaScript by completing code snippets.',
    image: '/images/javascript.png',
    type: 'CODING_CHALLENGE' as QuestionType,
    studyPath: 'javascript-fundamentals',
  },
  {
    tag: ['arrays', 'Array', 'array-methods'],
    title: 'Arrays',
    description: 'Learn all the key concepts of arrays in JavaScript.',
    image: '/images/arrays.png',
    studyPath: 'arrays',
  },
  {
    tag: ['javascript', 'JavaScript', 'javaScript', 'generators'],
    title: 'Javascript Questions',
    description:
      'Learn how to use JavaScript to build more efficient and scalable applications.',
    image: '/images/javascript.png',
    studyPath: 'javascript-questions',
  },
  {
    tag: ['react'],
    title: 'React Questions',
    description: 'Explore the most popular JavaScript framework, React.',
    image: '/images/react.png',
    studyPath: 'react-fundamentals',
  },
  {
    tag: ['react-hooks'],
    title: 'React Hooks',
    description:
      'Learn how to use React Hooks to build more efficient and scalable applications.',
    image: '/images/react.png',
    studyPath: 'react-hooks',
  },
  {
    tag: ['async', 'promises'],
    title: 'Asynchronous Programming',
    description: 'Learn how to handle asynchronous operations in JavaScript.',
    image: '/images/async.png',
    studyPath: 'asynchronous-programming',
  },
];

export default function QuestionsCarouselList({
  user,
}: {
  user: UserRecord | null;
}) {
  return (
    <div className="flex flex-col gap-y-16 md:gap-y-20 pt-10">
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
            studyPath={carousel.studyPath}
          >
            <QuestionCarouselContent
              tag={carousel.tag}
              type={carousel.type}
              user={user}
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
  type,
  user,
}: {
  tag: string[];
  difficulty?: QuestionDifficulty;
  type?: 'CODING_CHALLENGE' | 'MULTIPLE_CHOICE';
  user: UserRecord | null;
}) {
  const questions = await getQuestionsByTag(tag, difficulty, 10, type);
  const flattenedQuestions = questions.flatMap((q) =>
    q.questions.map((question: any) => ({
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
            user={user}
          />
        </CarouselItem>
      ))}
    </>
  );
}
