export default function MdxList({ children }: { children: React.ReactNode }) {
  return (
    <ul className="my-6 ml-6 list-disc space-y-2 marker:text-white [&>li]:text-base">
      {children}
    </ul>
  );
}
