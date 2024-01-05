export const verificarEncontro = (participanteA, participanteB) => {
    return (
      encontrosPorParticipante[participanteA]?.has(participanteB) ||
      encontrosPorParticipante[participanteB]?.has(participanteA)
    );
  };