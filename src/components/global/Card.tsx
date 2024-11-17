import { Separator } from '@radix-ui/react-separator';

export default function Card({
  header,
  children,
}: Readonly<{
  header?: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <div className="h-[45rem] col-span-full bg-black-75 border border-black-50 rounded-xl relative overflow-hidden">
      <div className="p-4 text-sm flex w-full items-center justify-between bg-black-25">
        {header}
      </div>
      <Separator className="bg-black-50" />
      {children}
    </div>
  );
}
