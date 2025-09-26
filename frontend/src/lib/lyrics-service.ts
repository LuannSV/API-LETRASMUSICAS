export interface LyricsData {
  artist: string;
  song: string;
  lyrics: string;
  searchedAt: Date;
}

export interface LyricsApiResponse {
  lyrics: string;
}

export class LyricsService {
  private static readonly API_BASE = "https://api.lyrics.ovh/v1";
  private static readonly STORAGE_KEY = "lyrics_history";
  private static readonly FAVORITES_KEY = "lyrics_favorites";

  /**
   * Busca a letra de uma música
   */
  static async searchLyrics(artist: string, song: string): Promise<LyricsData> {
    const cleanArtist = artist.trim();
    const cleanSong = song.trim();

    if (!cleanArtist || !cleanSong) {
      throw new Error("Artista e música são obrigatórios");
    }

    try {
      const response = await fetch(
        `${this.API_BASE}/${encodeURIComponent(cleanArtist)}/${encodeURIComponent(cleanSong)}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Letra não encontrada para esta música");
        }
        throw new Error(`Erro na API: ${response.status}`);
      }

      const data: LyricsApiResponse = await response.json();
      
      if (!data.lyrics || data.lyrics.trim() === "") {
        throw new Error("Letra não encontrada para esta música");
      }

      const lyricsData: LyricsData = {
        artist: cleanArtist,
        song: cleanSong,
        lyrics: data.lyrics.trim(),
        searchedAt: new Date()
      };

      // Salva no histórico
      this.saveToHistory(lyricsData);

      return lyricsData;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Erro inesperado ao buscar a letra");
    }
  }

  /**
   * Salva uma busca no histórico
   */
  private static saveToHistory(lyricsData: LyricsData): void {
    if (typeof window === "undefined") return;

    try {
      const history = this.getSearchHistory();
      
      // Remove duplicatas (mesmo artista e música)
      const filteredHistory = history.filter(
        item => !(
          item.artist.toLowerCase() === lyricsData.artist.toLowerCase() &&
          item.song.toLowerCase() === lyricsData.song.toLowerCase()
        )
      );

      // Adiciona no início da lista
      const newHistory = [lyricsData, ...filteredHistory].slice(0, 10); // Mantém apenas 10 itens

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newHistory));
    } catch (error) {
      console.warn("Erro ao salvar no histórico:", error);
    }
  }

  /**
   * Obtém o histórico de buscas
   */
  static getSearchHistory(): LyricsData[] {
    if (typeof window === "undefined") return [];

    try {
      const history = localStorage.getItem(this.STORAGE_KEY);
      if (!history) return [];

      const parsedHistory = JSON.parse(history) as LyricsData[];
      return parsedHistory.map((item) => ({
        ...item,
        searchedAt: new Date(item.searchedAt)
      }));
    } catch (error) {
      console.warn("Erro ao ler histórico:", error);
      return [];
    }
  }

  /**
   * Limpa o histórico de buscas
   */
  static clearHistory(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(this.STORAGE_KEY);
  }

  /**
   * Adiciona uma letra aos favoritos
   */
  static addToFavorites(lyricsData: LyricsData): void {
    if (typeof window === "undefined") return;

    try {
      const favorites = this.getFavorites();
      
      // Verifica se já está nos favoritos
      const exists = favorites.some(
        item => 
          item.artist.toLowerCase() === lyricsData.artist.toLowerCase() &&
          item.song.toLowerCase() === lyricsData.song.toLowerCase()
      );

      if (!exists) {
        const newFavorites = [lyricsData, ...favorites].slice(0, 50); // Limite de 50 favoritos
        localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(newFavorites));
      }
    } catch (error) {
      console.warn("Erro ao adicionar aos favoritos:", error);
    }
  }

  /**
   * Remove uma letra dos favoritos
   */
  static removeFromFavorites(artist: string, song: string): void {
    if (typeof window === "undefined") return;

    try {
      const favorites = this.getFavorites();
      const filteredFavorites = favorites.filter(
        item => !(
          item.artist.toLowerCase() === artist.toLowerCase() &&
          item.song.toLowerCase() === song.toLowerCase()
        )
      );

      localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(filteredFavorites));
    } catch (error) {
      console.warn("Erro ao remover dos favoritos:", error);
    }
  }

  /**
   * Obtém a lista de favoritos
   */
  static getFavorites(): LyricsData[] {
    if (typeof window === "undefined") return [];

    try {
      const favorites = localStorage.getItem(this.FAVORITES_KEY);
      if (!favorites) return [];

      const parsedFavorites = JSON.parse(favorites) as LyricsData[];
      return parsedFavorites.map((item) => ({
        ...item,
        searchedAt: new Date(item.searchedAt)
      }));
    } catch (error) {
      console.warn("Erro ao ler favoritos:", error);
      return [];
    }
  }

  /**
   * Verifica se uma música está nos favoritos
   */
  static isFavorite(artist: string, song: string): boolean {
    const favorites = this.getFavorites();
    return favorites.some(
      item => 
        item.artist.toLowerCase() === artist.toLowerCase() &&
        item.song.toLowerCase() === song.toLowerCase()
    );
  }

  /**
   * Formata o tempo de busca de forma amigável
   */
  static formatSearchTime(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return "Agora mesmo";
    if (minutes < 60) return `${minutes} min atrás`;
    if (hours < 24) return `${hours}h atrás`;
    if (days < 7) return `${days}d atrás`;
    
    return date.toLocaleDateString("pt-BR");
  }
}