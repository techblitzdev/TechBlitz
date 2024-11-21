-- AlterTable
CREATE SEQUENCE defaultroadmapquestions_order_seq;
ALTER TABLE "DefaultRoadmapQuestions" ALTER COLUMN "order" SET DEFAULT nextval('defaultroadmapquestions_order_seq');
ALTER SEQUENCE defaultroadmapquestions_order_seq OWNED BY "DefaultRoadmapQuestions"."order";

-- AlterTable
ALTER TABLE "UserRoadmaps" ADD COLUMN     "currentQuestionIndex" INTEGER NOT NULL DEFAULT 1;
