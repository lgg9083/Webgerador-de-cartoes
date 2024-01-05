import React, { useState } from "react";
import {distribuirParticipantesPorMesas} from "./distribuicao";
import {criarListaDeParticipantes} from '../utils/criarListaDeParticipantes';
import {gerarMesas} from '../utils/gerarMesas';
import {gerarRodadas} from '../utils/gerarRodadas';

const handleGerarCartoes = (
  numeroParticipantes,
  tempoMaximoEventoHoras,
  tempoPorRodadaMinutos,
  numeroMaximoPorMesa
) => {
  const qtdMesa = Math.ceil(numeroParticipantes / numeroMaximoPorMesa);
  const rodadasPossiveis = Math.ceil((tempoMaximoEventoHoras * 60) / tempoPorRodadaMinutos);
  const ListaRodadas = gerarRodadas(rodadasPossiveis);
  const ListaParticipantes = criarListaDeParticipantes(numeroParticipantes);

  const { gruposPorRodada } = distribuirParticipantesPorMesas(ListaRodadas, qtdMesa, numeroMaximoPorMesa, ListaParticipantes);

  const cartoes = {};

  gruposPorRodada.forEach((rodada) => {
    rodada.grupos.forEach((grupo) => {
      grupo.participantes.forEach((participante) => {
        if (!cartoes[participante]) {
          cartoes[participante] = [];
        }
        cartoes[participante].push({
          participante,
          rodada: rodada.rodada,
          mesa: grupo.mesa
        });
      });
    });
  });

  return cartoes;
};




const PaginaDados = () => {
  const [numeroParticipantes, setNumeroParticipantes] = useState("");
  const [tempoMaximoEventoHoras, setTempoMaximoEventoHoras] = useState("");
  const [tempoPorRodadaMinutos, setTempoPorRodadaMinutos] = useState("");
  const [numeroMaximoPorMesa, setNumeroMaximoPorMesa] = useState("");
  const [cartoesGerados, setCartoesGerados] = useState([]);
  const [mostrarPaginaCartoes, setMostrarPaginaCartoes] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const gerarCartoes = async () => {
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
    
    try {
      setCarregando(true); // Ativar o estado de carregamento
  
      const qtdMesa = Math.ceil(numeroParticipantes / numeroMaximoPorMesa);
      const rodadasPossiveis = Math.ceil((tempoMaximoEventoHoras * 60) / tempoPorRodadaMinutos);
      const ListaRodadas = gerarRodadas(rodadasPossiveis);
      const ListaParticipantes = criarListaDeParticipantes(numeroParticipantes);
  
      const { gruposPorRodada } = distribuirParticipantesPorMesas(ListaRodadas, qtdMesa, numeroMaximoPorMesa, ListaParticipantes);
  
      const cartoes = {};
  
      gruposPorRodada.forEach((rodada) => {
        rodada.grupos.forEach((grupo) => {
          grupo.participantes.forEach((participante) => {
            if (!cartoes[participante]) {
              cartoes[participante] = [];
            }
            cartoes[participante].push({
              participante,
              rodada: rodada.rodada,
              mesa: grupo.mesa
            });
          });
        });
      });
  
      setCartoesGerados(cartoes);
      setMostrarPaginaCartoes(true);
    } catch (error) {
      console.error('Erro ao gerar os cartões:', error);
    } finally {
      setCarregando(false); // Desativar o estado de carregamento após a conclusão
    }
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
          <label htmlFor="tempoPorRodada">Tempo por rodada (Minutos):</label>
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
        {/* Indicador de carregamento */}
        {carregando ? (
          <div>Carregando...</div>
        ) : (
          <div>
            <h2>Cartões Gerados:</h2>
            {Object.entries(cartoesGerados).map(([participante, cartoes], index) => (
              <div key={index}>
                <h3>{participante}</h3>
                <ul>
                  {cartoes.map((cartao, i) => (
                    <li key={i}>
                      {cartao.rodada}, {cartao.mesa}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    )}
  </div>
  );
};

export default PaginaDados;
