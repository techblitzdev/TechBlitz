import React from 'react';

interface AdminContainerProps {
  children: React.ReactNode;
}

export default function AdminContainer({ children }: AdminContainerProps) {
  return (
    <div className="w-full min-h-screen bg-[#000000]">
      <div className="container mx-auto py-8 px-4">{children}</div>
    </div>
  );
}
