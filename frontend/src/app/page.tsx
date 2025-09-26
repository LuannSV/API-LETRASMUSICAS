import Link from "next/link";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600">
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Encontre as letras das suas músicas favoritas
          </h2>
          <p className="text-xl text-purple-100 mb-12 max-w-3xl mx-auto">
            Descubra e explore letras de músicas de todos os gêneros e artistas.
            Nossa plataforma oferece uma experiência única para amantes da música.
          </p>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Busca Rápida
              </h3>
              <p className="text-purple-100">
                Encontre letras instantaneamente digitando o nome do artista e da música
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="text-4xl mb-4">🎤</div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Milhares de Artistas
              </h3>
              <p className="text-purple-100">
                Acesso a um vasto banco de dados com letras de artistas do mundo todo
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="text-4xl mb-4">💖</div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Interface Moderna
              </h3>
              <p className="text-purple-100">
                Design responsivo e intuitivo para uma experiência excepcional
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/lyrics"
              className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold hover:bg-purple-50 transition-colors shadow-lg"
            >
              Buscar Letras Agora
            </Link>
            <Link
              href="/users"
              className="bg-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-purple-700 transition-colors border border-white/30"
            >
              Ver Usuários
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-sm border-t border-white/20 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-purple-100">
            © 2025 LetrasMsc. Desenvolvido com ❤️ para amantes da música.
          </p>
        </div>
      </footer>
    </div>
  );
}
