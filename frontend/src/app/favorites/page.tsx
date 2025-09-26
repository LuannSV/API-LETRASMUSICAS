"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { LyricsService, LyricsData } from "@/lib/lyrics-service";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<LyricsData[]>([]);
  const [selectedLyrics, setSelectedLyrics] = useState<LyricsData | null>(null);

  useEffect(() => {
    setFavorites(LyricsService.getFavorites());
  }, []);

  const removeFavorite = (artist: string, song: string) => {
    LyricsService.removeFromFavorites(artist, song);
    setFavorites(LyricsService.getFavorites());
    
    // Se a música removida estava sendo exibida, limpar a visualização
    if (selectedLyrics && 
        selectedLyrics.artist === artist && 
        selectedLyrics.song === song) {
      setSelectedLyrics(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            ❤️ Seus Favoritos
          </h1>
          <p className="text-xl text-purple-100">
            Suas letras de música favoritas em um só lugar
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-6">💫</div>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Nenhum favorito ainda
            </h2>
            <p className="text-purple-100 mb-8">
              Comece a favoritar suas letras de música preferidas para vê-las aqui
            </p>
            <a
              href="/lyrics"
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors shadow-lg inline-block"
            >
              🔍 Buscar Letras
            </a>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Lista de Favoritos */}
            <div className="lg:col-span-1">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 sticky top-8">
                <h2 className="text-xl font-semibold text-white mb-4">
                  📚 Lista de Favoritos ({favorites.length})
                </h2>
                
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {favorites.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedLyrics(item)}
                      className={`p-4 rounded-lg cursor-pointer transition-colors border ${
                        selectedLyrics?.artist === item.artist && selectedLyrics?.song === item.song
                          ? "bg-white/30 border-white/50"
                          : "bg-white/10 border-white/20 hover:bg-white/20"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-white truncate">
                            {item.song}
                          </h3>
                          <p className="text-purple-200 text-sm truncate">
                            {item.artist}
                          </p>
                          <p className="text-purple-300 text-xs mt-1">
                            {LyricsService.formatSearchTime(item.searchedAt)}
                          </p>
                        </div>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFavorite(item.artist, item.song);
                          }}
                          className="ml-3 text-red-400 hover:text-red-300 p-1"
                          title="Remover dos favoritos"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Visualização da Letra */}
            <div className="lg:col-span-2">
              {selectedLyrics ? (
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                  <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                    <div>
                      <h2 className="text-3xl font-bold text-white">
                        {selectedLyrics.song}
                      </h2>
                      <p className="text-purple-200 text-xl">
                        por {selectedLyrics.artist}
                      </p>
                      <p className="text-purple-300 text-sm mt-1">
                        Favoritado em {LyricsService.formatSearchTime(selectedLyrics.searchedAt)}
                      </p>
                    </div>
                    
                    <div className="flex gap-3">
                      <button
                        onClick={() => navigator.clipboard.writeText(selectedLyrics.lyrics)}
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-semibold"
                      >
                        📋 Copiar
                      </button>
                      
                      <button
                        onClick={() => removeFavorite(selectedLyrics.artist, selectedLyrics.song)}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-semibold"
                      >
                        💔 Remover
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-black/20 rounded-lg p-6 max-h-96 overflow-y-auto">
                    <pre className="text-purple-100 whitespace-pre-wrap text-base leading-relaxed font-mono">
                      {selectedLyrics.lyrics}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-12 border border-white/20 text-center">
                  <div className="text-6xl mb-6">👈</div>
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    Selecione um favorito
                  </h3>
                  <p className="text-purple-100">
                    Clique em uma música da lista ao lado para visualizar a letra completa
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Ações Rápidas */}
        {favorites.length > 0 && (
          <div className="mt-12 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm rounded-xl p-8 border border-white/20">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-4">
                🚀 Ações Rápidas
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/lyrics"
                  className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
                >
                  🔍 Buscar Mais Letras
                </a>
                <button
                  onClick={() => {
                    if (confirm("Tem certeza que deseja limpar todos os favoritos?")) {
                      favorites.forEach(item => {
                        LyricsService.removeFromFavorites(item.artist, item.song);
                      });
                      setFavorites([]);
                      setSelectedLyrics(null);
                    }
                  }}
                  className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors border border-white/30"
                >
                  🗑️ Limpar Todos
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}