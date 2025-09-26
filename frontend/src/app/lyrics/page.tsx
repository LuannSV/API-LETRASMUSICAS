"use client";

import { useState } from "react";
import Link from "next/link";
import { getLyrics, type LyricsResponse } from "@/lib/api";

export default function LyricsPage() {
  const [banda, setBanda] = useState("");
  const [musica, setMusica] = useState("");
  const [lyrics, setLyrics] = useState<LyricsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchLyrics = async () => {
    if (!banda.trim() || !musica.trim()) {
      setError("Por favor, preencha ambos os campos");
      return;
    }

    setLoading(true);
    setError(null);
    setLyrics(null);

    try {
      const data = await getLyrics(banda, musica);
      setLyrics(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao buscar letra");
    } finally {
      setLoading(false);
    }
  };

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
            🎵 Buscar Letras
          </h1>
          <p className="text-xl text-gray-300">
            Encontre as letras das suas músicas favoritas
          </p>
        </header>

        {/* Search Form */}
        <main className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 mb-8">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="banda" className="block text-sm font-medium text-white mb-2">
                  Nome da Banda/Artista
                </label>
                <input
                  id="banda"
                  type="text"
                  value={banda}
                  onChange={(e) => setBanda(e.target.value)}
                  placeholder="Ex: Coldplay, Ed Sheeran, Taylor Swift..."
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="musica" className="block text-sm font-medium text-white mb-2">
                  Nome da Música
                </label>
                <input
                  id="musica"
                  type="text"
                  value={musica}
                  onChange={(e) => setMusica(e.target.value)}
                  placeholder="Ex: Yellow, Shape of You, Love Story..."
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <button
              onClick={searchLyrics}
              disabled={loading}
              className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Buscando...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Buscar Letra
                </div>
              )}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 backdrop-blur-lg rounded-2xl p-6 border border-red-500/30 mb-8">
              <div className="flex items-center">
                <div className="text-2xl mr-3">⚠️</div>
                <div>
                  <h3 className="text-lg font-semibold text-red-300 mb-1">Erro</h3>
                  <p className="text-red-200">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Lyrics Result */}
          {lyrics && (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {lyrics.banda} - {lyrics.musica}
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-600 mx-auto rounded-full"></div>
              </div>
              
              <div className="bg-white/5 rounded-xl p-6">
                <pre className="text-gray-200 whitespace-pre-wrap font-mono text-sm leading-relaxed">
                  {lyrics.letra}
                </pre>
              </div>
              
              <div className="mt-6 text-center">
                <button
                  onClick={() => {
                    setLyrics(null);
                    setBanda("");
                    setMusica("");
                    setError(null);
                  }}
                  className="px-6 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
                >
                  Nova Busca
                </button>
              </div>
            </div>
          )}

          {/* Tips */}
          {!lyrics && !error && (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <span className="text-2xl mr-3">💡</span>
                Dicas para uma melhor busca
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-pink-400 mr-2">•</span>
                  Digite o nome exato da banda ou artista
                </li>
                <li className="flex items-start">
                  <span className="text-pink-400 mr-2">•</span>
                  Use o nome oficial da música
                </li>
                <li className="flex items-start">
                  <span className="text-pink-400 mr-2">•</span>
                  Evite caracteres especiais e acentos desnecessários
                </li>
                <li className="flex items-start">
                  <span className="text-pink-400 mr-2">•</span>
                  Se não encontrar, tente variações do nome
                </li>
              </ul>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}