import * as Tone from "tone"
import { melodySequences } from "../parts/melodyPart.js"

const melodySynthSettings = {
  harmonicity: 2.01,
  modulationIndex: 1.5,

  oscillator: {
    type: "sine"
  },

  envelope: {
    attack: 0.005,
    decay: 2.5,
    sustain: 0,
    release: 2
  },

  modulation: {
    type: "sine"
  },

  modulationEnvelope: {
    attack: 0.001,
    decay: 0.6,
    sustain: 0,
    release: 0.8
  }
}

let melodySynth = null
let melodyVolume = null
let melodyDelay = null
let melodyIsMuted = false
let melodyParts = []

function initMelodyVolumeControl() {
  const volumeInput = document.querySelector("#melody-volume")

  volumeInput.addEventListener("input", () => {
    const value = Number(volumeInput.value)

    melodyVolume.volume.rampTo(value, 0.05)

    melodyVolume.mute = melodyIsMuted
  })
}

function initMelodyMuteControl() {
  const muteButton = document.querySelector("#melody-mute")

  muteButton.addEventListener("click", () => {
    melodyIsMuted = !melodyIsMuted
    melodyVolume.mute = melodyIsMuted

    muteButton.classList.toggle(
      "mute__button--active",
      melodyIsMuted
    )

    muteButton.textContent = melodyIsMuted
      ? "play"
      : "mute"
  })
}

function initMelodyDecayControl() {
  const decayInput = document.querySelector("#melody-decay")

  decayInput.addEventListener("input", () => {
    const value = Number(decayInput.value)

    melodySynth.set({
      envelope: {
        decay: value
      }
    })
  })
}

function initMelodyEchoControl() {
  const echoInput = document.querySelector("#melody-echo")

  echoInput.addEventListener("input", () => {
    const value = Number(echoInput.value)

    melodyDelay.wet.rampTo(value, 0.05)
  })
}

function initMelodySynth() {
  if (melodySynth) return

  melodyVolume = new Tone.Volume(0).toDestination()

  melodyDelay = new Tone.FeedbackDelay({
    delayTime: "8n",
    feedback: 0.25,
    wet: 0.1
  }).connect(melodyVolume)

  melodySynth = new Tone.PolySynth(
    Tone.FMSynth,
    melodySynthSettings
    ).connect(melodyDelay)

  melodyParts = melodySequences.map((sequence) => {
    return new Tone.Part((time, note) => {
      melodySynth.triggerAttackRelease(
        note.noteName,
        note.duration,
        time,
        note.velocity
      )
    }, sequence).start(0)
  })

  melodyParts.forEach((part) => {
    part.mute = true
  })

  initMelodyVolumeControl()
  initMelodyMuteControl()
  initMelodyDecayControl()
  initMelodyEchoControl()
}

export { initMelodySynth, melodyParts }