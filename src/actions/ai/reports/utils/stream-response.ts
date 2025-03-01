import { createStreamableValue } from 'ai/rsc';
import { LanguageModelV1, streamObject } from 'ai';

export const streamResponse = async (model: LanguageModelV1, messages: any[], schema: any) => {
  const stream = createStreamableValue();

  (async () => {
    const { partialObjectStream } = streamObject({
      model,
      messages,
      schema,
    });

    try {
      for await (const partialObject of partialObjectStream) {
        stream.update(partialObject);
      }

      stream.done();
    } catch (error) {
      console.error('Error generating AI response:', error);
      stream.update({ error: 'Failed to generate response. Please try again.' });
      stream.done();
    }
  })();

  return { object: stream.value };
};
