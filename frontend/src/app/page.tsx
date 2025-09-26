import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            LetrasMsc
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Descubra as letras das suas músicas favoritas
          </p>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Search Section */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <h2 className="text-2xl font-semibold text-white mb-6">
                🎵 Buscar Letras
              </h2>
              <p className="text-gray-300 mb-6">
                Encontre as letras das suas músicas favoritas de forma rápida e fácil.
              </p>
              <Link
                href="/lyrics"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                Buscar Letras
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Users Section */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <h2 className="text-2xl font-semibold text-white mb-6">
                👥 Usuários
              </h2>
              <p className="text-gray-300 mb-6">
                Veja a lista de usuários cadastrados no sistema.
              </p>
              <Link
                href="/users"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105"
              >
                Ver Usuários
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <div className="text-4xl mb-4">🎤</div>
                <h3 className="text-xl font-semibold text-white mb-2">Busca Rápida</h3>
                <p className="text-gray-300 text-sm">
                  Encontre letras de qualquer artista ou banda instantaneamente
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <div className="text-4xl mb-4">📱</div>
                <h3 className="text-xl font-semibold text-white mb-2">Interface Moderna</h3>
                <p className="text-gray-300 text-sm">
                  Design responsivo e intuitivo para uma melhor experiência
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-semibold text-white mb-2">Performance</h3>
                <p className="text-gray-300 text-sm">
                  Carregamento rápido e resultados instantâneos
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center mt-16 text-gray-400">
          <p>&copy; 2024 LetrasMsc. Feito com ❤️ para os amantes da música.</p>
        </footer>
      </div>
    </div>
  );
}
