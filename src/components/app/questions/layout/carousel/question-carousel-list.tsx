import { getQuestionsByTag } from '@/utils/data/questions/get-questions-by-tag';
import QuestionCarousel from './question-carousel';
import { Answer } from '@/types/Answers';
import { QuestionWithTags } from '@/types/Questions';

export default async function QuestionsCarouselList() {
  const questionsCarousels = [
    {
      tag: ['javascript', 'JavaScript', 'javaScript', 'generators'],
      title: 'Javascript Questions',
      description:
        'Learn how to use JavaScript to build more efficient and scalable applications.',
      image: '/images/javascript.png',
      questions: [],
    },
    {
      tag: ['react'],
      title: 'React Questions',
      description: 'Explore the most popular JavaScript framework, React.',
      image: '/images/react.png',
      questions: [],
    },
    {
      tag: ['react-hooks'],
      title: 'React Hooks',
      description:
        'Learn how to use React Hooks to build more efficient and scalable applications.',
      image: '/images/react.png',
      questions: [],
    },
    {
      tag: ['arrays', 'Array', 'array-methods'],
      title: 'Arrays',
      description: 'Learn all the key concepts of arrays in JavaScript.',
      image: '/images/arrays.png',
      questions: [],
    },
    {
      tag: ['async', 'promises'],
      title: 'Asynchronous Programming',
      description: 'Learn how to handle asynchronous operations in JavaScript.',
      image: '/images/async.png',
      questions: [],
    },
  ];

  // fetch questions by tag via the questionsCarousels array
  const questionsByTag = await Promise.all(
    questionsCarousels.map(async (carousel) => {
      const questions = await getQuestionsByTag(carousel.tag);
      return {
        ...carousel,
        questions: questions.flatMap((q) =>
          q.questions.map((question) => question.question)
        ),
        userAnswers: questions.flatMap((q) =>
          q.questions.map((question) => question.question.userAnswers)
        ),
      };
    })
  );

  return (
    <div className="flex flex-col gap-y-16 md:gap-y-28 pt-10">
      {questionsByTag.map((carousel, index) => (
        <QuestionCarousel
          key={`carousel-${index}-${carousel.tag}-${carousel.title}`}
          heading={carousel.title}
          description={carousel.description}
          image={carousel.image}
          questions={
            carousel.questions as unknown as QuestionWithTags[] & {
              userAnswers: Answer;
            }
          }
          tag={carousel.tag}
        />
      ))}
    </div>
  );
}
