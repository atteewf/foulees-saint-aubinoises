// app/components/PageWrapper.tsx
export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex-1 max-w-7xl mx-auto px-6 w-full py-16">
      {children}
    </main>
  );
}
