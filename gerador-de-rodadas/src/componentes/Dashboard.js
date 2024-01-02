import React, { useState } from "react";

export const handleGerarCartoes = (
  numeroParticipantes,
  tempoMaximoEventoHoras,
  tempoPorRodadaHoras,
  numeroMaximoPorMesa
) => { 
  const rodadasPossiveis = Math.floor(tempoMaximoEventoHoras / tempoPorRodadaHoras);
  let participantes = Array.from({ length: numeroParticipantes }, (_, index) => index + 1);
  participantes.sort(() => Math.random() - 0.5);
  const cartoesPorParticipante = {};
  const mesasDisponiveis = Array.from(
    { length: Math.ceil(numeroParticipantes / numeroMaximoPorMesa) },
    (_, index) => index + 1
  );
  const confrontosAnteriores = {};

  participantes.forEach((participante) => {
    cartoesPorParticipante[participante] = [];
  });

  for (let rodada = 1; rodada <= rodadasPossiveis; rodada++) {
    console.log(`Iniciando Rodada ${rodada}`);
    let rodadaConcluida = false;

    while (!rodadaConcluida) {
      console.log(`  Iniciando nova iteração para a Rodada ${rodada}`);
      const confrontosRodada = [];
      const confrontosPorParticipante = {};
      participantes.forEach((participante) => {
        confrontosPorParticipante[participante] = [];
      });

      let mesas = mesasDisponiveis.sort(() => Math.random() - 0.5);

      let participantesDisponiveis = [...participantes];

      while (participantesDisponiveis.length > 1) {
        console.log(`inniciando nova iteração de participantes`);
        const participanteA = participantesDisponiveis.shift();
        console.log(`escolhendo para o participante A: ${participanteA}`);

        const grupo = [participanteA];

        while (grupo.length < numeroMaximoPorMesa && participantesDisponiveis.length > 0) {
          console.log(`verificando confrontos para ${participanteA}`);
          const possiveisConfrontos = participantesDisponiveis.filter(
            (p) =>
              !confrontosPorParticipante[participanteA].includes(p) &&
              !confrontosPorParticipante[p].includes(participanteA) &&
              (!confrontosAnteriores[participanteA] ||
                !confrontosAnteriores[participanteA].has(p))
          );

          console.log(
            `possiveis confrontos para ${participanteA}:`,
            possiveisConfrontos
          );

          if (possiveisConfrontos.length > 0) {
            const indiceConfronto = Math.floor(Math.random() * possiveisConfrontos.length);
            const confronto = possiveisConfrontos[indiceConfronto];
            grupo.push(confronto);
            participantesDisponiveis = participantesDisponiveis.filter((p) => p !== confronto);

            confrontosAnteriores[participanteA] = confrontosAnteriores[participanteA] || new Set();
            confrontosAnteriores[participanteA].add(confronto);
            confrontosAnteriores[confronto] = confrontosAnteriores[confronto] || new Set();
            confrontosAnteriores[confronto].add(participanteA);

            confrontosPorParticipante[participanteA].push(confronto);
            confrontosPorParticipante[confronto].push(participanteA);
          } else {
            break;
          }
        }

        if (grupo.length > 1) {
          const mesaAtual = mesas[0] || mesas[Math.floor(Math.random() * mesas.length)];
          confrontosRodada.push(`Mesa ${mesaAtual}: ${grupo.join(", ")}`);
          grupo.forEach((participante) => {
            cartoesPorParticipante[participante].push({ rodada, mesa: mesaAtual });
          });
          mesas = mesas.filter((mesa) => mesa !== mesaAtual);
        } else {
          participantesDisponiveis.push(participanteA);
        }
      }

      const participantesAusentes = participantes.filter(participante => {
        return cartoesPorParticipante[participante].length !== rodada;
      });

      participantesAusentes.forEach(participante => {
        let mesaAleatoria = mesasDisponiveis[Math.floor(Math.random() * mesasDisponiveis.length)];
        while (cartoesPorParticipante[participante].some(info => info.mesa === mesaAleatoria)) {
          mesaAleatoria = mesasDisponiveis[Math.floor(Math.random() * mesasDisponiveis.length)];
        }
        cartoesPorParticipante[participante].push({ rodada, mesa: mesaAleatoria });
      });

      const todosConcluidos = participantes.every(participante => {
        return cartoesPorParticipante[participante].length === rodada;
      });

      if (todosConcluidos) {
        rodadaConcluida = true;
      } else {
        console.log(`Rodada ${rodada} incompleta, reorganizando participantes...`);
      }
    }
  }

  Object.keys(cartoesPorParticipante).forEach((participante) => {
    console.log(` ${participante}:`);
    cartoesPorParticipante[participante].forEach((info) => {
      console.log(`Rodada ${info.rodada}, Mesa ${info.mesa}`);
    });
  });

  return cartoesPorParticipante;
};

const PaginaDados = () => {
  const [numeroParticipantes, setNumeroParticipantes] = useState("");
  const [tempoMaximoEventoHoras, setTempoMaximoEventoHoras] = useState("");
  const [tempoPorRodadaHoras, setTempoPorRodadaHoras] = useState("");
  const [numeroMaximoPorMesa, setNumeroMaximoPorMesa] = useState("");
  const [cartoesGerados, setCartoesGerados] = useState([]);
  const [mostrarPaginaCartoes, setMostrarPaginaCartoes] = useState(false);

  const gerarCartoes = () => {
    if (!numeroParticipantes || !tempoMaximoEventoHoras || !tempoPorRodadaHoras || !numeroMaximoPorMesa) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    if (tempoPorRodadaHoras > tempoMaximoEventoHoras) {
      alert("O tempo por rodada não pode ser maior que o tempo total do evento. Por favor, insira os dados novamente.");
      // Resetar os campos
      setNumeroParticipantes("");
      setTempoMaximoEventoHoras("");
      setTempoPorRodadaHoras("");
      setNumeroMaximoPorMesa("");
      return;
    }
    const cartoes = handleGerarCartoes(
      Number(numeroParticipantes),
      Number(tempoMaximoEventoHoras),
      Number(tempoPorRodadaHoras),
      Number(numeroMaximoPorMesa)
    );

    const cartoesGerados = Object.keys(cartoes).map((participante) => ({
      participante,
      rodadasEMesas: cartoes[participante],
    }));

    setCartoesGerados(cartoesGerados);
    setMostrarPaginaCartoes(true);
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
            value={tempoPorRodadaHoras}
            onChange={(e) => setTempoPorRodadaHoras(e.target.value)}
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
