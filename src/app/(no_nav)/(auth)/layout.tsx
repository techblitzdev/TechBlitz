export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative">
      <h6 className="top-4 left-4 absolute font-satoshi text-xl">meerge</h6>
      {children}
    </div>
  );
}
