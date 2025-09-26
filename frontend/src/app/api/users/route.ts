import { NextResponse } from "next/server";

// Mock data for users
const mockUsers = [
  {
    id: 1,
    name: "João Silva",
    email: "joao.silva@email.com"
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria.santos@email.com"
  },
  {
    id: 3,
    name: "Pedro Oliveira",
    email: "pedro.oliveira@email.com"
  },
  {
    id: 4,
    name: "Ana Costa",
    email: "ana.costa@email.com"
  },
  {
    id: 5,
    name: "Carlos Rodrigues"
    // Email opcional para demonstrar flexibilidade
  },
  {
    id: 6,
    name: "Fernanda Lima",
    email: "fernanda.lima@email.com"
  }
];

export async function GET() {
  try {
    // Simular um pequeno delay para parecer uma chamada real de API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return NextResponse.json(mockUsers);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}