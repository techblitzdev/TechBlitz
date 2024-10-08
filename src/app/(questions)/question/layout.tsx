export default function QuestionsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="container text-white flex flex-col gap-y-4 py-12">
      {children}
    </div>
  );
}
