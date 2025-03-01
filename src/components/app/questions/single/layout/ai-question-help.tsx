'use client';

import { useEffect, useState, useTransition } from 'react';
import { generateQuestionHelp } from '@/actions/ai/questions/question-help';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { Question } from '@/types/Questions';
import { Send, Infinity } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tooltip, TooltipTrigger, TooltipProvider, TooltipContent } from '@/components/ui/tooltip';
import Link from 'next/link';
import { UserRecord } from '@/types/User';
import { capitalize } from 'lodash';
import { RoadmapUserQuestions } from '@/types/Roadmap';
import { DefaultRoadmapQuestions } from '@prisma/client';
import { getUpgradeUrl } from '@/utils';

import { readStreamableValue } from 'ai/rsc';

import { userIsPremium } from '@/utils/user';
import ChatBot from '@/components/ui/icons/chat-bot';

// the maximum amount of time we allow the AI to generate a response
export const maxDuration = 30;

// Define message types
interface Message {
  type: 'user' | 'assistant';
  content: string | any;
  timestamp: Date;
}

export default function AiQuestionHelp(opts: {
  question: Question | RoadmapUserQuestions | DefaultRoadmapQuestions;
  user: UserRecord | null;
  questionType: 'roadmap' | 'regular';
}) {
  const { question, user, questionType } = opts;

  const [isPending, startTransition] = useTransition();

  // chat state
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [tokensUsed, setTokensUsed] = useState(0);

  useEffect(() => {
    if (user?.aiQuestionHelpTokens !== undefined) {
      setTokensUsed(user.aiQuestionHelpTokens);
    }
  }, [user]);

  // TODO: TEMP FIX
  const loginHref =
    questionType === 'roadmap'
      ? `/login?redirectUrl=dashboard`
      : `/login?redirectUrl=question/${(question as Question).slug}`;

  const textAreaPlaceholder =
    user?.userLevel === 'FREE'
      ? 'Upgrade to premium to use AI assistance'
      : messages.length === 0
        ? 'Ask for help with this question...'
        : 'Ask a follow up question...';

  // prepare message context for AI
  const getMessageContext = (): string => {
    // if this is the first message, return just the message
    if (messages.length === 0) {
      return currentMessage;
    }

    // for subsequent messages, provide some context from the conversation
    const contextFromPreviousMessages = messages
      .slice(-4) // take last 4 messages for context
      .map(
        (msg) =>
          `${msg.type.toUpperCase()}: ${
            typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content)
          }`
      )
      .join('\n\n');

    return `Previous conversation:\n${contextFromPreviousMessages}\n\nCurrent question: ${currentMessage}`;
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage: Message = {
      type: 'user',
      content: currentMessage,
      timestamp: new Date(),
    };

    // add user message to chat
    setMessages((prev) => [...prev, userMessage]);

    // clear input field
    setCurrentMessage('');

    startTransition(async () => {
      try {
        // prepare context with previous messages
        const messageContext = getMessageContext();

        // call the AI for a response
        const { object } = await generateQuestionHelp(question.uid, messageContext, questionType);

        if (typeof object === 'string') {
          // handle plain string response
          const aiMessage: Message = {
            type: 'assistant',
            content: JSON.parse(object),
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, aiMessage]);
          return;
        }

        // handle streamable value
        if (object && typeof object === 'object') {
          // placeholder for streaming response
          const placeholderMessage: Message = {
            type: 'assistant',
            content: { status: 'loading' },
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, placeholderMessage]);

          try {
            // process the streamed response
            // Make sure we're working with a properly created StreamableValue object
            // @ts-ignore - This is needed because the StreamableValue types don't match perfectly
            for await (const partialObject of readStreamableValue(object)) {
              if (partialObject) {
                // update the placeholder message with actual content
                setMessages((prev) =>
                  prev.map((msg, idx) =>
                    idx === prev.length - 1 ? { ...msg, content: partialObject } : msg
                  )
                );
              }
            }

            // update token count
            if (user?.aiQuestionHelpTokens !== undefined) {
              setTokensUsed(user.aiQuestionHelpTokens);
            }
          } catch (error) {
            console.error('Error streaming response:', error);
            // update placeholder with error
            setMessages((prev) =>
              prev.map((msg, idx) =>
                idx === prev.length - 1
                  ? {
                      ...msg,
                      content: {
                        error:
                          'Sorry, I encountered an issue while processing your request. Please try again.',
                      },
                    }
                  : msg
              )
            );
          }
        }
      } catch (error) {
        console.error('Error getting AI response:', error);
        // add error message
        const errorMessage: Message = {
          type: 'assistant',
          content: {
            error: 'Sorry, I encountered an issue while processing your request. Please try again.',
          },
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    });
  };

  const clearChat = () => {
    setMessages([]);
  };

  const handleQuickPrompt = (prompt: string) => {
    setCurrentMessage(prompt);
    if (userIsPremium(user)) {
      setTimeout(() => handleSendMessage(), 100);
    }
  };

  return (
    <Popover>
      <PopoverTrigger>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <ChatBot className="size-4" />
        </motion.div>
      </PopoverTrigger>
      <PopoverContent
        className={`w-80 lg:w-[550px] h-[500px] flex flex-col bg-black-100 text-white border border-black-50`}
        align="end"
      >
        <div className="flex items-center justify-between border-b border-black-50 pb-2 mb-2">
          <div className="flex items-center gap-2">
            <ChatBot className="size-6" />
            <h5 className="text-lg font-semibold">AI Assistant</h5>
          </div>
          <div className="flex items-center space-x-2">
            <p className="text-xs text-gray-400">
              {userIsPremium(user) ? (
                <>
                  {user?.userLevel === 'LIFETIME' ? (
                    `${tokensUsed} tokens remaining`
                  ) : (
                    <div className="flex items-center gap-x-1">
                      <Infinity className="size-4" />
                      <span className="text-xs text-gray-400">tokens remaining</span>
                    </div>
                  )}
                </>
              ) : (
                <Link href={getUpgradeUrl()} className="text-accent underline">
                  Upgrade to Premium
                </Link>
              )}
            </p>
            {messages.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 text-xs hover:bg-black-75"
                onClick={clearChat}
              >
                Clear
              </Button>
            )}
          </div>
        </div>

        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-grow gap-4 mb-4">
            <p className="text-center text-sm text-gray-400 font-onest">
              Ask me anything about this question!
            </p>
            {!userIsPremium(user) && (
              <div className="bg-black-75 rounded-md p-4 text-center">
                <p className="text-xs text-gray-400 mb-2">
                  Premium users get unlimited AI assistance
                </p>
                <Link
                  href={getUpgradeUrl()}
                  className="inline-block bg-accent text-white py-1 px-3 rounded-md text-xs"
                >
                  Upgrade to Premium
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-grow overflow-y-auto mb-4 pr-2 space-y-3 scrollable-element">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] font-onest rounded-lg p-2 ${
                    message.type === 'user' ? 'bg-accent text-white' : 'bg-black-75 text-white'
                  }`}
                >
                  {message.type === 'user' ? (
                    <p className="text-sm">{message.content}</p>
                  ) : (
                    <div className="text-sm">
                      {message.content.status === 'loading' ? (
                        <div className="h-5 flex items-center justify-center">
                          <div className="animate-pulse">Thinking...</div>
                        </div>
                      ) : message.content.error ? (
                        <p className="text-red-400">{message.content.error}</p>
                      ) : (
                        Object.entries(message.content).map(([key, value], idx) => (
                          <div key={idx} className="mb-1">
                            {Object.keys(message.content).length > 1 && (
                              <h3 className="text-xs font-bold">
                                {capitalize(key.replace(/-/g, ' '))}
                              </h3>
                            )}
                            {typeof value === 'string' ? (
                              <p>{value.replace(/```/g, '')}</p>
                            ) : (
                              <pre className="text-xs overflow-x-auto">
                                {JSON.stringify(value, null, 2)}
                              </pre>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Input area */}
        <div className="mt-auto pt-2">
          {user ? (
            <>
              <div className="flex items-end gap-2">
                <Textarea
                  placeholder={textAreaPlaceholder}
                  className="min-h-10 h-10 text-white border border-black-50 resize-none"
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      if (!isPending && userIsPremium(user)) {
                        handleSendMessage();
                      }
                    }
                  }}
                />
                <TooltipProvider>
                  <Tooltip disableHoverableContent={userIsPremium(user)}>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant="secondary"
                        disabled={isPending || !userIsPremium(user) || !currentMessage.trim()}
                        onClick={handleSendMessage}
                        className="h-10 w-10 flex-shrink-0"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {!userIsPremium(user)
                        ? 'Upgrade to premium to use AI assistance'
                        : 'Send message'}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              {/* Quick prompts */}
              <div className="flex flex-wrap gap-2 mt-2">
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => handleQuickPrompt("I don't understand this question")}
                  disabled={isPending || !userIsPremium(user)}
                  rounded="lg"
                  fontSize="xs"
                >
                  I don't understand this question
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => handleQuickPrompt('Can you explain this in simpler terms?')}
                  disabled={isPending || !userIsPremium(user)}
                  rounded="lg"
                  fontSize="xs"
                >
                  Explain in simpler terms
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => handleQuickPrompt('What approach should I take?')}
                  disabled={isPending || !userIsPremium(user)}
                  rounded="lg"
                  fontSize="xs"
                >
                  What approach should I take?
                </Button>
              </div>

              {isPending && (
                <p className="text-xs text-gray-400 mt-1">Processing your request...</p>
              )}
            </>
          ) : (
            <Button variant="secondary" className="w-full" href={loginHref}>
              Login to request AI assistance
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
