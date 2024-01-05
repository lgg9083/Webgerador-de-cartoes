export const criarListaDeParticipantes = (numeroParticipantes) => {
    const participantes = []
    for (let i = 1; i <= numeroParticipantes; i++) {
      if (numeroParticipantes > 0) {
        participantes.push(`P${i}`)
      }
    }
    return participantes
  }