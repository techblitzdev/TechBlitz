export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative bg-dot-white/[0.2]">
      <h6 className="font-semibold top-4 left-4 absolute font-satoshi text-2xl z-30">
        meerge
      </h6>
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="container text-white h-screen flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
