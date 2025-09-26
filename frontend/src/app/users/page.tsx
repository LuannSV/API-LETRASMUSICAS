import { getUsers, User } from "@/lib/api";
import Link from "next/link";
import Header from "@/components/Header";

export default async function UsersPage() {
  let users: User[] = [];
  let error = "";

  try {
    users = await getUsers();
  } catch (err) {
    error = "Erro ao carregar usuários. Verifique se a API está funcionando.";
    console.error("Erro ao buscar usuários:", err);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600">
      <Header />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            👥 Usuários da Plataforma
          </h1>
          <p className="text-xl text-purple-100">
            Conheça os usuários registrados em nossa plataforma
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-6 mb-8">
            <div className="flex items-center">
              <span className="text-3xl mr-4">⚠️</span>
              <div>
                <h3 className="text-lg font-semibold text-red-100 mb-1">
                  Erro ao Carregar Usuários
                </h3>
                <p className="text-red-200">{error}</p>
                <p className="text-red-200 text-sm mt-2">
                  Certifique-se de que a API está rodando e acessível.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Users List */}
        {!error && (
          <>
            {users.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-6">👤</div>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Nenhum usuário encontrado
                </h2>
                <p className="text-purple-100 mb-8">
                  Ainda não há usuários cadastrados na plataforma
                </p>
                <div className="bg-blue-500/20 border border-blue-500/50 rounded-xl p-6 max-w-md mx-auto">
                  <h3 className="text-lg font-semibold text-blue-100 mb-2">
                    💡 Dica para Desenvolvedores
                  </h3>
                  <p className="text-blue-200 text-sm">
                    Verifique se a API está configurada corretamente e retornando dados de usuários.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">📊</span>
                      <span className="text-white font-semibold">
                        Total de usuários: {users.length}
                      </span>
                    </div>
                    <div className="text-purple-200 text-sm">
                      Dados atualizados em tempo real
                    </div>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {users.map((user) => (
                    <div
                      key={user.id}
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white mb-1">
                            {user.name}
                          </h3>
                          {user.email ? (
                            <p className="text-purple-200 text-sm break-all">
                              📧 {user.email}
                            </p>
                          ) : (
                            <p className="text-purple-300 text-sm italic">
                              Email não informado
                            </p>
                          )}
                          <div className="flex items-center mt-3 text-xs text-purple-300">
                            <span className="bg-purple-500/30 px-2 py-1 rounded-full">
                              ID: {user.id}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {/* Info Card */}
        <div className="mt-12 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm rounded-xl p-8 border border-white/20">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              🚀 Plataforma em Desenvolvimento
            </h2>
            <p className="text-purple-100 mb-6">
              Esta é uma versão de demonstração. Os dados de usuários são obtidos da API configurada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/lyrics"
                className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
              >
                🎵 Buscar Letras
              </Link>
              <Link
                href="/"
                className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors border border-white/30"
              >
                🏠 Voltar ao Início
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

