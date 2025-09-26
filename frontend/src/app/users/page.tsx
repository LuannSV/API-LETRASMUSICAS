import { getUsers } from "@/lib/api";
import Link from "next/link";

export default async function UsersPage() {
  let users = [];
  let error = null;

  try {
    users = await getUsers();
  } catch (err) {
    error = "Erro ao carregar usuários. Verifique se o backend está rodando.";
    console.error("Error fetching users:", err);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <header className="text-center mb-12">
          <Link 
            href="/"
            className="inline-flex items-center text-white/70 hover:text-white transition-colors mb-8"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar ao início
          </Link>
          <h1 className="text-4xl font-bold text-white mb-4">
            👥 Usuários
          </h1>
          <p className="text-xl text-gray-300">
            Lista de usuários cadastrados no sistema
          </p>
        </header>

        {/* Content */}
        <main className="max-w-4xl mx-auto">
          {error ? (
            <div className="bg-red-500/20 backdrop-blur-lg rounded-2xl p-8 border border-red-500/30">
              <div className="flex items-center mb-4">
                <div className="text-2xl mr-3">⚠️</div>
                <h2 className="text-xl font-semibold text-red-300">Erro de Conexão</h2>
              </div>
              <p className="text-red-200 mb-4">{error}</p>
              <div className="bg-red-900/30 rounded-lg p-4">
                <p className="text-sm text-red-200">
                  <strong>Dica:</strong> Certifique-se de que o backend está rodando na porta 3001.
                  Execute: <code className="bg-red-800/50 px-2 py-1 rounded">cd LetrasMsc && poetry run python app.py</code>
                </p>
              </div>
            </div>
          ) : users.length === 0 ? (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 text-center">
              <div className="text-6xl mb-4">👤</div>
              <h2 className="text-2xl font-semibold text-white mb-2">Nenhum usuário encontrado</h2>
              <p className="text-gray-300">Não há usuários cadastrados no sistema.</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {users.map((user) => (
                <div 
                  key={user.id} 
                  className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-1">
                        {user.name}
                      </h3>
                      {user.email && (
                        <p className="text-gray-300 flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          {user.email}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-gray-400">ID: {user.id}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

