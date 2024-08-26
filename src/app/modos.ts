export interface IModos{
    id: number,
    letra: string,
    nome: string,
    potencia: number,
    tempo: string,
    instrucao?: string
}

export const  EnumModo: IModos[] = [
    {id: 1, letra: 'P', nome: 'Pipoca', potencia: 7, tempo: '03:00'},
    {id: 2, letra: 'L', nome: 'Leite', potencia: 5, tempo: '05:00'},
    {id: 3, letra: 'C', nome: 'Carnes de boi', potencia: 4, tempo: '14:00'},
    {id: 4, letra: 'F', nome: 'Frango', potencia: 7, tempo: '08:00'},
    {id: 5, letra: 'J', nome: 'Feijão', potencia: 9, tempo: '08:00'},
]