export const distribuirParticipantesPorMesas = (listaDeRodadas, qtdMesas, numeroMaximoDeParticipantesPorMesa, listaDeParticipantes) => {

    const gruposPorRodada = listaDeRodadas.map((_, index) => ({ rodada: `Rodada ${index + 1}`, grupos: [] }));
    const encontrosPorParticipante = {};
    const todosEncontros = new Set();  
  
    for (let rodadaIndex = 0; rodadaIndex < ListaRodadas.length; rodadaIndex++) {
      const participantesEmbaralhados = ListaParticipantes.slice().sort(() => Math.random() - 0.5);
  
      for (let mesa = 0; mesa < qtdMesas; mesa++) {
        const grupo = [];
  
        for (let i = 0; i < numeroMaximoPorMesa; i++) {
          const participante = participantesEmbaralhados.pop();
  
          if (!participante) break;
  
          const podeAdicionar = grupo.every(membro => !verificarEncontro(membro, participante));
  
          if (podeAdicionar) {
            grupo.push(participante);
            for (const membro of grupo) {
              criarEncontros(membro, participante);
            }
          } else {
            participantesEmbaralhados.unshift(participante);
          }
        }
  
        if (grupo.length > 0) {
          gruposPorRodada[rodadaIndex].grupos.push(grupo);
        }
      }
    }
  
    const gruposFormatados = gruposPorRodada.map(({ rodada, grupos }) => ({ rodada, grupos }));
    console.log(gruposFormatados)
  
    const gruposComMesas = distribuirMesasPorRodada(qtdMesas, gruposFormatados);
  
    const todosEncontrosArray = Array.from(todosEncontros).map(item => item.split('-'));
  
    return { gruposPorRodada: gruposComMesas, todosEncontros: todosEncontrosArray };
  };
  
  export default distribuicaoP
  
  
  /**
   * 
   * Algoritmo
   * 
   * 1. Recebe: quantidade de participantes, a duração do evento, a duração da rodada, o máximo de participantes por mes
   * 2. Converter os tempos para horas
   * 3. Calcular quantidade de mesas e rodadas por mesa
   * 4. Descobrir número ideal de pessoas por mesa
   * 5. Preencher os lugares na mesa para cada rodada
   * 6. Exibir a lista de mesas por rodada para cada participante
   * 
   */