import { Separator } from "../ui/separator";

export default function Card({
  header,
  children,
  footer,
}: Readonly<{
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-black-75 border border-black-50 rounded-xl relative overflow-hidden flex flex-col">
      <div className="p-4 text-sm flex w-full items-center justify-between bg-black-25">
        {header}
      </div>
      <Separator className="bg-black-50" />
      <div className="flex-grow overflow-auto">{children}</div>
      {footer && (
        <>
          <Separator className="bg-black-50" />
          <div className="p-4 text-sm flex w-full items-center justify-between">
            {footer}
          </div>
        </>
      )}
    </div>
  );
}
