import { handleGerarCartoes } from "../componentes/Dashboard";


describe('Testes para handleGerarCartoes', () => {
  
  
  test('Deve gerar as rodadas corretamente para cada participante', () => {
    const numeroParticipantes = 20;
    const tempoMaximoEventoHoras = 5;
    const tempoPorRodadaHoras = 1;
    const numeroMaximoPorMesa = 4;

    const cartoes = handleGerarCartoes(
      numeroParticipantes,
      tempoMaximoEventoHoras,
      tempoPorRodadaHoras,
      numeroMaximoPorMesa
    );

    const participantes = Object.keys(cartoes);

    participantes.forEach((participante) => {
      const rodadasParticipante = cartoes[participante].map((info) => info.rodada);
      const rodadasEsperadas = new Set(rodadasParticipante);

      expect(rodadasEsperadas.size).toBe(rodadasParticipante.length);
    });
  });

  test('Não há reencontros entre os participantes em rodadas diferentes', () => {
    const numeroParticipantes = 20;
    const tempoMaximoEventoHoras = 5;
    const tempoPorRodadaHoras = 1;
    const numeroMaximoPorMesa = 4;

    const cartoes = handleGerarCartoes(
      numeroParticipantes,
      tempoMaximoEventoHoras,
      tempoPorRodadaHoras,
      numeroMaximoPorMesa
    );

    const participantes = Object.keys(cartoes);
    const encontros = {};

    participantes.forEach((participante) => {
      encontros[participante] = new Set();

      cartoes[participante].forEach((info) => {
        encontros[participante].add(info.mesa);
      });
    });

    const todasRodadas = Object.values(encontros).flat();
    const rodadasUnicas = new Set(todasRodadas);

    expect(rodadasUnicas.size).toBe(todasRodadas.length);
  });
  test("Deve gerar encontros únicos para cada participante", () => {
    const numeroParticipantes = 20;
    const tempoMaximoEventoHoras = 5;
    const tempoPorRodadaHoras = 1;
    const numeroMaximoPorMesa = 4;

    const cartoes = handleGerarCartoes(
      numeroParticipantes,
      tempoMaximoEventoHoras,
      tempoPorRodadaHoras,
      numeroMaximoPorMesa
    );

    Object.keys(cartoes).forEach((participante) => {
      const encontros = new Set();
      cartoes[participante].forEach((info) => {
        const encontro = `Rodada ${info.rodada}, Mesa ${info.mesa}`;
        encontros.add(encontro);
      });

      expect(encontros.size).toBe(cartoes[participante].length);
    });
  });

  test('Verificar se o número de participantes por mesa não excede o limite', () => {
    const numeroParticipantes = 20;
    const tempoMaximoEventoHoras = 5;
    const tempoPorRodadaHoras = 1;
    const numeroMaximoPorMesa = 4;
  
    const cartoes = handleGerarCartoes(
      numeroParticipantes,
      tempoMaximoEventoHoras,
      tempoPorRodadaHoras,
      numeroMaximoPorMesa
    );
  
    const participantes = Object.keys(cartoes);
  
    participantes.forEach((participante) => {
      const mesas = cartoes[participante].map((info) => info.mesa);
      const participantesPorMesa = {};
  
      mesas.forEach((mesa) => {
        if (!participantesPorMesa[mesa]) {
          participantesPorMesa[mesa] = 1;
        } else {
          participantesPorMesa[mesa]++;
        }
  
        expect(participantesPorMesa[mesa]).toBeLessThanOrEqual(numeroMaximoPorMesa);
      });
    });
  });
  
});