"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { LyricsService, LyricsData } from "@/lib/lyrics-service";

export default function LyricsPage() {
  const [artist, setArtist] = useState("");
  const [song, setSong] = useState("");
  const [currentLyrics, setCurrentLyrics] = useState<LyricsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchHistory, setSearchHistory] = useState<LyricsData[]>([]);
  const [favorites, setFavorites] = useState<LyricsData[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  // Carrega dados do localStorage quando o componente monta
  useEffect(() => {
    setSearchHistory(LyricsService.getSearchHistory());
    setFavorites(LyricsService.getFavorites());
  }, []);

  const searchLyrics = async () => {
    setLoading(true);
    setError("");
    setCurrentLyrics(null);

    try {
      const lyricsData = await LyricsService.searchLyrics(artist, song);
      setCurrentLyrics(lyricsData);
      
      // Atualiza o histórico local
      setSearchHistory(LyricsService.getSearchHistory());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro inesperado ao buscar a letra");
      console.error("Erro na busca:", err);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setArtist("");
    setSong("");
    setCurrentLyrics(null);
    setError("");
  };

  const selectFromHistory = (item: LyricsData) => {
    setArtist(item.artist);
    setSong(item.song);
    setCurrentLyrics(item);
    setShowHistory(false);
  };

  const toggleFavorite = () => {
    if (!currentLyrics) return;

    const isFav = LyricsService.isFavorite(currentLyrics.artist, currentLyrics.song);
    
    if (isFav) {
      LyricsService.removeFromFavorites(currentLyrics.artist, currentLyrics.song);
    } else {
      LyricsService.addToFavorites(currentLyrics);
    }
    
    // Atualiza a lista de favoritos
    setFavorites(LyricsService.getFavorites());
  };

  const clearHistory = () => {
    LyricsService.clearHistory();
    setSearchHistory([]);
    setShowHistory(false);
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
                placeholder="Ex: Taylor Swift"
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
                placeholder="Ex: Anti-Hero"
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent"
                onKeyPress={(e) => e.key === "Enter" && searchLyrics()}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <button
              onClick={searchLyrics}
              disabled={loading || !artist.trim() || !song.trim()}
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? "🔄 Buscando..." : "🔍 Buscar Letra"}
            </button>
            <button
              onClick={clearSearch}
              className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors border border-white/30"
            >
              🗑️ Limpar
            </button>
          </div>

          {/* Quick Access Buttons */}
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="bg-blue-600/80 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              📚 Histórico ({searchHistory.length})
            </button>
            <button
              onClick={() => setShowFavorites(!showFavorites)}
              className="bg-pink-600/80 text-white px-4 py-2 rounded-lg text-sm hover:bg-pink-700 transition-colors flex items-center gap-2"
            >
              ❤️ Favoritos ({favorites.length})
            </button>
            {searchHistory.length > 0 && (
              <button
                onClick={clearHistory}
                className="bg-red-600/80 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors"
              >
                🗑️ Limpar Histórico
              </button>
            )}
          </div>
        </div>

        {/* History Panel */}
        {showHistory && searchHistory.length > 0 && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">📚 Buscas Recentes</h3>
            <div className="grid gap-3">
              {searchHistory.map((item, index) => (
                <div
                  key={index}
                  onClick={() => selectFromHistory(item)}
                  className="bg-white/10 p-4 rounded-lg cursor-pointer hover:bg-white/20 transition-colors border border-white/20"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-white">{item.song}</h4>
                      <p className="text-purple-200 text-sm">{item.artist}</p>
                    </div>
                    <span className="text-xs text-purple-300">
                      {LyricsService.formatSearchTime(item.searchedAt)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Favorites Panel */}
        {showFavorites && favorites.length > 0 && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">❤️ Favoritos</h3>
            <div className="grid gap-3">
              {favorites.map((item, index) => (
                <div
                  key={index}
                  onClick={() => selectFromHistory(item)}
                  className="bg-white/10 p-4 rounded-lg cursor-pointer hover:bg-white/20 transition-colors border border-white/20"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-white">{item.song}</h4>
                      <p className="text-purple-200 text-sm">{item.artist}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        LyricsService.removeFromFavorites(item.artist, item.song);
                        setFavorites(LyricsService.getFavorites());
                      }}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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
        {currentLyrics && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {currentLyrics.song}
                </h2>
                <p className="text-purple-200 text-lg">
                  por {currentLyrics.artist}
                </p>
                <p className="text-purple-300 text-sm">
                  Buscado em {LyricsService.formatSearchTime(currentLyrics.searchedAt)}
                </p>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={toggleFavorite}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    currentLyrics && LyricsService.isFavorite(currentLyrics.artist, currentLyrics.song)
                      ? "bg-pink-600 text-white hover:bg-pink-700"
                      : "bg-white/20 text-white hover:bg-white/30 border border-white/30"
                  }`}
                >
                  {currentLyrics && LyricsService.isFavorite(currentLyrics.artist, currentLyrics.song) 
                    ? "❤️ Favoritado" 
                    : "🤍 Favoritar"
                  }
                </button>
                
                <button
                  onClick={() => navigator.clipboard.writeText(currentLyrics.lyrics)}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-semibold"
                >
                  📋 Copiar
                </button>
              </div>
            </div>
            
            <div className="bg-black/20 rounded-lg p-6 max-h-96 overflow-y-auto">
              <pre className="text-purple-100 whitespace-pre-wrap text-base leading-relaxed font-mono">
                {currentLyrics.lyrics}
              </pre>
            </div>
            
            {/* Additional Info */}
            <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
              <div className="flex items-center gap-2 text-blue-200 text-sm">
                <span>💡</span>
                <span>
                  Gostou desta música? Adicione aos favoritos para acessar rapidamente depois!
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!currentLyrics && !error && !loading && (
          <div className="text-center py-12">
            <div className="text-6xl mb-6">🎵</div>
            <h3 className="text-2xl font-semibold text-white mb-4">
              Descubra as letras das suas músicas favoritas
            </h3>
            <p className="text-xl text-purple-100 mb-8">
              Digite o nome do artista e da música para começar sua busca
            </p>
            
            {/* Quick suggestions */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 max-w-2xl mx-auto">
              <h4 className="text-lg font-semibold text-white mb-4">💡 Dicas para melhores resultados:</h4>
              <div className="text-left text-purple-100 space-y-2">
                <p>• Use o nome completo do artista</p>
                <p>• Certifique-se de que o nome da música está correto</p>
                <p>• Evite caracteres especiais desnecessários</p>
                <p>• Tente variações do nome se não encontrar</p>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="text-6xl mb-6 animate-pulse-custom">🔍</div>
            <h3 className="text-2xl font-semibold text-white mb-4">
              Buscando letra...
            </h3>
            <p className="text-purple-100">
              Aguarde enquanto encontramos a letra da música para você
            </p>
          </div>
        )}
      </main>
    </div>
  );
}