export const criarEncontros = (participanteA, participanteB) => {
    if (participanteA !== participanteB) {
      const encontro = [participanteA, participanteB].sort().join('-');
      todosEncontros.add(encontro);
      if (!encontrosPorParticipante[participanteA]) {
        encontrosPorParticipante[participanteA] = new Set();
      }
      if (!encontrosPorParticipante[participanteB]) {
        encontrosPorParticipante[participanteB] = new Set();
      }
      encontrosPorParticipante[participanteA].add(participanteB);
      encontrosPorParticipante[participanteB].add(participanteA);
    }
  };



  