const hiHats__1 = [
    {
        time: '0:0:0',
        noteName: 'C1',
        duration: '8n',
        velocity: 1
    }
]

const hiHats__2 = [
    {
        time: '0:0:2',
        noteName: 'C1',
        duration: '8n',
        velocity: 1
    }
]

const hiHats__3 = [
    {
        time: '0:1:0',
        noteName: 'C1',
        duration: '8n',
        velocity: 1
    }
]

const hiHats__4 = [
    {
        time: '0:1:2',
        noteName: 'C1',
        duration: '8n',
        velocity: 1
    }
]

const hiHats__5 = [
    {
        time: '0:2:0',
        noteName: 'C1',
        duration: '8n',
        velocity: 1
    }
]

const hiHats__6 = [
    {
        time: '0:2:2',
        noteName: 'C1',
        duration: '8n',
        velocity: 1
    }
]

const hiHats__7 = [
    {
        time: '0:3:0',
        noteName: 'C1',
        duration: '8n',
        velocity: 1
    }
]

const hiHats__8 = [
    {
        time: '0:3:2',
        noteName: 'C1',
        duration: '8n',
        velocity: 1
    }
]

const hiHatsSequences = [
  hiHats__1,
  hiHats__2,
  hiHats__3,
  hiHats__4,
  hiHats__5,
  hiHats__6,
  hiHats__7,
  hiHats__8
].map((sequence) => {
  const note = sequence[0]

  return Array.from({ length: 8 }, (_, bar) => ({
    ...note,
    time: `${bar}:${note.time.split(":").slice(1).join(":")}`
  }))
})

export { hiHatsSequences }