import * as Tone from "tone"
import { harmonySequences } from "../parts/harmonyPart.js"

const harmonySynthSettings = {
  harmonicity: 2.01,
  modulationIndex: 2.5,

  oscillator: {
    type: "sine"
  },

  envelope: {
    attack: 0.005,
    decay: 1.5,
    sustain: 0,
    release: 1.8
  },

  modulation: {
    type: "sine"
  },

  modulationEnvelope: {
    attack: 0.001,
    decay: 0.5,
    sustain: 0,
    release: 0.7
  }
}

let harmonySynth = null
let harmonyVolume = null
let harmonyParts = []
let harmonyDelay = null
let harmonyIsMuted = false

function initHarmonyVolumeControl() {
  const volumeInput = document.querySelector("#harmony-volume")

  volumeInput.addEventListener("input", () => {
    const value = Number(volumeInput.value)

    harmonyVolume.volume.rampTo(value, 0.05)
    harmonyVolume.mute = harmonyIsMuted
  })
}

function initHarmonyMuteControl() {
  const muteButton = document.querySelector("#harmony-mute")

  muteButton.addEventListener("click", () => {
    harmonyIsMuted = !harmonyIsMuted
    harmonyVolume.mute = harmonyIsMuted

    muteButton.classList.toggle(
      "mute__button--active",
      harmonyIsMuted
    )

    muteButton.textContent = harmonyIsMuted
      ? "play"
      : "mute"
  })
}

function initHarmonyEchoControl() {
  const echoInput = document.querySelector("#harmony-echo")

  echoInput.addEventListener("input", () => {
    const value = Number(echoInput.value)

    harmonyDelay.wet.rampTo(value, 0.05)
  })
}

function initHarmonySynth() {
  if (harmonySynth) return

  harmonyVolume = new Tone.Volume(-6).toDestination()

  harmonyDelay = new Tone.FeedbackDelay({
    delayTime: "8n",
    feedback: 0.25,
    wet: 0.1
  }).connect(harmonyVolume)

  harmonySynth = new Tone.PolySynth(
    Tone.FMSynth,
    harmonySynthSettings
  ).connect(harmonyDelay)

  harmonyParts = harmonySequences.map((sequence) => {
    return new Tone.Part((time, note) => {
      harmonySynth.triggerAttackRelease(
        note.noteName,
        note.duration,
        time,
        note.velocity
      )
    }, sequence).start(0)
  })

  harmonyParts.forEach((part) => {
    part.mute = true
  })

  initHarmonyVolumeControl()
  initHarmonyMuteControl()
  initHarmonyEchoControl()
}

export { initHarmonySynth, harmonyParts }