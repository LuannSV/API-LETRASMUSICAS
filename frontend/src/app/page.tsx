// 1. A importação que faltava foi adicionada aqui
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    // 2. Layout simplificado com Flexbox. É mais fácil de entender e manter.
    // 'flex-col' empilha os itens, e 'min-h-screen' garante que o layout ocupe a tela toda.
    <div className="flex min-h-screen flex-col items-center justify-center p-8 font-sans">

      {/* O 'flex-grow' faz esta seção principal se expandir e empurrar o rodapé para baixo */}
      <main className="flex flex-grow flex-col items-center justify-center gap-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-800 sm:text-6xl">
            Bem-vindo ao Meu Projeto
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Um ponto de partida limpo para começar a construir.
          </p>
        </div>

        {/* 3. Seção de links principais, mais clara e focada */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/users" // Apontando para uma página interna, usando o componente Link
            className="rounded-lg bg-slate-900 px-6 py-3 text-center font-medium text-white transition-colors hover:bg-slate-700"
          >
            Ver Usuários
          </Link>
          <a
            href="https://github.com/LuannSV/API-LETRASMUSICAS" // Link externo, usando a tag <a>
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-slate-300 px-6 py-3 text-center font-medium text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-100"
          >
            Ver no GitHub
          </a>
        </div>
      </main>

      {/* 4. Rodapé mais simples */}
      <footer className="text-center text-sm text-slate-500">
        <p>
          Desenvolvido com Next.js e Tailwind CSS.
        </p>
      </footer>
    </div>
  );
}
