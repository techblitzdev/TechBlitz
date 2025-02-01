import { Button } from "@/components/ui/button";

export default async function RoadmapGenerateButton({
  roadmapUid,
  generate,
}: {
  roadmapUid: string;
  generate: string;
}) {
  if (generate.length || generate === "generated") {
    return (
      <Button href={`/roadmap/${roadmapUid}`} variant="accent" fullWidth>
        Go to Roadmap
      </Button>
    );
  }

  return null;
}
