export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* Header */}

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}

      {/* Mini Cart (floating) */}
    </div>
  );
}
