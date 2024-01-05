export const distribuirMesasPorRodada = (qtdMesas, gruposPorRodada) => {
    const gruposComMesas = gruposPorRodada.map((rodada, index) => {
      const mesasPorRodada = gerarMesas(qtdMesas);
      const gruposComIdentificador = rodada.grupos.map(grupo => {
        const mesaAtual = mesasPorRodada.shift();
        return { mesa: mesaAtual, participantes: grupo };
      });
      return { rodada: rodada.rodada, grupos: gruposComIdentificador };
    });
    return gruposComMesas;
  };