export default function RoadmapRootLayout({
  children,
  modal
}: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
