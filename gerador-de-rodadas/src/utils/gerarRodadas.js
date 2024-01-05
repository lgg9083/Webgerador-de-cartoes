export const gerarRodadas = (rodadasPossiveis) => {
    const rodadas = [];
    for (let i = 1; i <= rodadasPossiveis; i++) {
      rodadas.push(`Rodada ${i}`);
    }
    return rodadas;
  };