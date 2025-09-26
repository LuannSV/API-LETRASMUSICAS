import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function Layout({ children, className = "" }: LayoutProps) {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 ${className}`}>
      <Header />
      {children}
      
      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-sm border-t border-white/20 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-purple-100">
            © 2025 LetrasMsc. Desenvolvido com ❤️ para amantes da música.
          </p>
        </div>
      </footer>
    </div>
  );
}