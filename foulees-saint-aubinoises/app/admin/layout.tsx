export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-fsa-noir flex items-center justify-center">
      {children}
    </div>
  );
}
