import { getQuestionsByTag } from '@/utils/data/questions/get-questions-by-tag';
import QuestionCarousel from './question-carousel';
import { QuestionWithTags } from '@/types/Questions';

export default async function QuestionsCarouselList() {
  const questionsCarousels = [
    {
      tag: 'javascript',
      title: 'Javascript Questions',
      description:
        'Explore a diverse set of Javascript questions to enhance your knowledge.',
      image: '/images/javascript.png',
      questions: [],
    },
    {
      tag: 'react',
      title: 'React Questions',
      description:
        'Explore a diverse set of React questions to enhance your knowledge.',
      image: '/images/react.png',
      questions: [],
    },
    {
      tag: 'async',
      title: 'Async Questions',
      description:
        'Explore a diverse set of questions relating to asynchronous programming.',
      image: '/images/async.png',
      questions: [],
    },
    {
      tag: 'promises',
      title: 'Web Development Questions',
      description:
        'Explore a diverse set of questions relating to web development.',
      image: '/images/web-dev.png',
      questions: [],
    },
    {
      tag: 'promises',
      title: 'Web Development Questions',
      description:
        'Explore a diverse set of questions relating to web development.',
      image: '/images/web-dev.png',
      questions: [],
    },
    {
      tag: 'promises',
      title: 'Web Development Questions',
      description:
        'Explore a diverse set of questions relating to web development.',
      image: '/images/web-dev.png',
      questions: [],
    },
  ];

  // fetch questions by tag via the questionsCarousels array
  const questionsByTag = await Promise.all(
    questionsCarousels.map(async (carousel) => {
      const questions = await getQuestionsByTag(carousel.tag);
      return { ...carousel, questions };
    })
  );

  return (
    <div className="flex flex-col gap-y-16 md:gap-y-28 pt-10">
      {questionsByTag.map((carousel) => (
        <QuestionCarousel
          key={carousel.tag}
          heading={carousel.title}
          description={carousel.description}
          image={carousel.image}
          questions={carousel.questions as unknown as QuestionWithTags[]}
          tag={carousel.tag as 'javascript' | 'react' | 'async' | 'web-dev'}
        />
      ))}
    </div>
  );
}
