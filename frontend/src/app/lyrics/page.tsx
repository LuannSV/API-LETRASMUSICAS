"use client";

import { useState } from "react";
import Header from "@/components/Header";

interface LyricsResponse {
  lyrics: string;
}

export default function LyricsPage() {
  const [artist, setArtist] = useState("");
  const [song, setSong] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchLyrics = async () => {
    if (!artist.trim() || !song.trim()) {
      setError("Por favor, preencha o nome do artista e da música");
      return;
    }

    setLoading(true);
    setError("");
    setLyrics("");

    try {
      const response = await fetch(
        `https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(song)}`
      );

      if (!response.ok) {
        throw new Error("Letra não encontrada");
      }

      const data: LyricsResponse = await response.json();
      
      if (data.lyrics) {
        setLyrics(data.lyrics);
      } else {
        setError("Letra não encontrada para esta música");
      }
    } catch (err) {
      setError("Erro ao buscar a letra. Tente novamente ou verifique o nome do artista e música.");
      console.error("Erro na busca:", err);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setArtist("");
    setSong("");
    setLyrics("");
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600">
      <Header />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Buscar Letras de Música
          </h1>
          <p className="text-xl text-purple-100">
            Digite o nome do artista e da música para encontrar a letra
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 mb-8">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="artist" className="block text-sm font-medium text-white mb-2">
                Nome do Artista
              </label>
              <input
                type="text"
                id="artist"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                placeholder="Ex: The Beatles"
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent"
                onKeyPress={(e) => e.key === "Enter" && searchLyrics()}
              />
            </div>
            <div>
              <label htmlFor="song" className="block text-sm font-medium text-white mb-2">
                Nome da Música
              </label>
              <input
                type="text"
                id="song"
                value={song}
                onChange={(e) => setSong(e.target.value)}
                placeholder="Ex: Hey Jude"
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent"
                onKeyPress={(e) => e.key === "Enter" && searchLyrics()}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={searchLyrics}
              disabled={loading}
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? "Buscando..." : "🔍 Buscar Letra"}
            </button>
            <button
              onClick={clearSearch}
              className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors border border-white/30"
            >
              🗑️ Limpar
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-8">
            <div className="flex items-center">
              <span className="text-2xl mr-3">⚠️</span>
              <p className="text-red-100">{error}</p>
            </div>
          </div>
        )}

        {/* Lyrics Display */}
        {lyrics && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                {song} - {artist}
              </h2>
              <button
                onClick={() => navigator.clipboard.writeText(lyrics)}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm"
              >
                📋 Copiar
              </button>
            </div>
            <div className="bg-black/20 rounded-lg p-6 max-h-96 overflow-y-auto">
              <pre className="text-purple-100 whitespace-pre-wrap text-sm leading-relaxed">
                {lyrics}
              </pre>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!lyrics && !error && !loading && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎵</div>
            <p className="text-xl text-purple-100">
              Faça uma busca para ver as letras das suas músicas favoritas
            </p>
          </div>
        )}
      </main>
    </div>
  );
}