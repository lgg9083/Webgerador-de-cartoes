import React, { useState } from "react";


const gerarMesas = (qtdMesas) => {
  const mesas = [];
  for (let i = 1; i <= qtdMesas; i++) {
    if (qtdMesas > 0) {
      mesas.push(`Mesa ${i}`);
    }
  }
return mesas;
};

const gerarRodadas = (rodadasPossiveis)=>{
  const rodadas = [];
  for(let i = 1; i <= rodadasPossiveis; i++){
    if (rodadasPossiveis > 0){
      rodadas.push(`Rodada ${i}`);
    }
  }
  return rodadas;
}

const participante = (numeroParticipantes)=>{
    const participantes = []
    for (let i = 1; i <= numeroParticipantes; i++){
      if (numeroParticipantes > 0){
        participantes.push(`P${i}`)
      }
    }
    return participantes
}
const distribuicaoP = (ListaRodadas, qtdMesas, numeroMaximoPorMesa, ListaParticipantes) => {
  const gruposPorRodada = ListaRodadas.map((_, index) => ({ rodada: `Rodada ${index}`, grupos: [] }));
  const encontrosPorParticipante = {};
  const todosEncontros = new Set();

  // Função para criar encontros entre participantes
  const criarEncontros = (participanteA, participanteB) => {
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

  // Função para verificar se há encontros entre participantes
  const verificarEncontro = (participanteA, participanteB) => {
    return (
      encontrosPorParticipante[participanteA]?.has(participanteB) ||
      encontrosPorParticipante[participanteB]?.has(participanteA)
    );
  };
  // Distribuir participantes inicialmente
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
  
    //Função para verificar se uma rodada está completa
    
   
  
  
  
  const gruposFormatados = gruposPorRodada.map(({ rodada, grupos }) => ({ rodada, grupos }));
  const todosEncontrosArray = Array.from(todosEncontros).map(item => item.split('-'));

  return { gruposPorRodada: gruposFormatados, todosEncontros: todosEncontrosArray };
};








export const handleGerarCartoes = (
  numeroParticipantes,
  tempoMaximoEventoHoras,
  tempoPorRodadaMinutos,
  numeroMaximoPorMesa
) => { 
  const qtdMesa = Math.ceil(numeroParticipantes/numeroMaximoPorMesa)
  const rodadasPossiveis =  Math.ceil(tempoMaximoEventoHoras/tempoPorRodadaMinutos * 60)
  const rodadas = rodadasPossiveis
  console.log( `mesas : ${qtdMesa}`)
  console.log(`Rodadas: ${rodadasPossiveis}`)
  const listaMesas = gerarMesas(qtdMesa)
  console.log(listaMesas);
  const ListaRodadas = gerarRodadas(rodadas)
  console.log(ListaRodadas)
  const Listaparticipantes = participante(numeroParticipantes)
  console.log(distribuicaoP(ListaRodadas, qtdMesa, numeroMaximoPorMesa, Listaparticipantes))
  console.log(Listaparticipantes)
 
};

const PaginaDados = () => {
  const [numeroParticipantes, setNumeroParticipantes] = useState("");
  const [tempoMaximoEventoHoras, setTempoMaximoEventoHoras] = useState("");
  const [tempoPorRodadaMinutos, setTempoPorRodadaMinutos] = useState("");
  const [numeroMaximoPorMesa, setNumeroMaximoPorMesa] = useState("");
  const [cartoesGerados, setCartoesGerados] = useState([]);
  const [mostrarPaginaCartoes, setMostrarPaginaCartoes] = useState(false);

  const gerarCartoes = () => {
    if (!numeroParticipantes || !tempoMaximoEventoHoras || !tempoPorRodadaMinutos || !numeroMaximoPorMesa) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    if (tempoPorRodadaMinutos > tempoMaximoEventoHoras * 60) {
      alert("O tempo por rodada não pode ser maior que o tempo total do evento. Por favor, insira os dados novamente.");
      // Resetar os campos
      setNumeroParticipantes("");
      setTempoMaximoEventoHoras("");
      setTempoPorRodadaMinutos("");
      setNumeroMaximoPorMesa("");
      return;
    }
    
    const cartoes = handleGerarCartoes(
      Number(numeroParticipantes),
      Number(tempoMaximoEventoHoras),
      Number(tempoPorRodadaMinutos),
      Number(numeroMaximoPorMesa)
    );

   
    
   
  };

  return (
    <div>
      {!mostrarPaginaCartoes ? (
        <>
          <h2>Insira os dados:</h2>
          <label htmlFor="numeroParticipantes">Número de participantes:</label>
          <input
            id="numeroParticipantes"
            type="number"
            value={numeroParticipantes}
            onChange={(e) => setNumeroParticipantes(e.target.value)}
          />
          <label htmlFor="tempoMaximoEvento">Tempo Máximo do Evento (horas):</label>
          <input
            id="tempoMaximoEvento"
            type="number"
            value={tempoMaximoEventoHoras}
            onChange={(e) => setTempoMaximoEventoHoras(e.target.value)}
          />
          <label htmlFor="tempoPorRodada">Tempo por rodada (horas):</label>
          <input
            id="tempoPorRodada"
            type="number"
            value={tempoPorRodadaMinutos}
            onChange={(e) => setTempoPorRodadaMinutos(e.target.value)}
          />
          <label htmlFor="numeroMaximoPorMesa">Participantes por mesa:</label>
          <input
            id="numeroMaximoPorMesa"
            type="number"
            value={numeroMaximoPorMesa}
            onChange={(e) => setNumeroMaximoPorMesa(e.target.value)}
          />
          <button onClick={gerarCartoes}>Gerar Cartões</button>
        </>
      ) : (
        <div>
          <h2>Cartões Gerados:</h2>
          <ul>
            {cartoesGerados.map((cartao, index) => (
              <li key={index}>
                {cartao.participante}
                <ul>
                  {cartao.rodadasEMesas.map((info, i) => (
                    <li key={i}>
                      Rodada {info.rodada}, Mesa {info.mesa}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PaginaDados;
