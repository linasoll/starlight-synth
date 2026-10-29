import * as Tone from "tone"

import {
  bassHighSequence
} from "../parts/bassHighPart.js"

const bassHighSynthSettings = {
  oscillator: {
    type: "sine"
  },

  envelope: {
    attack: 0.05,
    decay: 0.3,
    sustain: 0.7,
    release: 1.2
  }
}

let bassHighSynth = null
let bassHighPart = null
let bassHighVolume = null
let bassHighIsMuted = false

function initBassHighVolumeControl() {
  const volumeInput = document.querySelector("#bass-high-volume")

  volumeInput.addEventListener("input", () => {
    const value = Number(volumeInput.value)

    bassHighVolume.volume.rampTo(value, 0.05)
    bassHighVolume.mute = bassHighIsMuted
  })
}

function initBassHighMuteControl() {
  const muteButton = document.querySelector("#bass-high-mute")

  muteButton.addEventListener("click", () => {
    bassHighIsMuted = !bassHighIsMuted
    bassHighVolume.mute = bassHighIsMuted

    muteButton.classList.toggle(
      "mute__button--active",
      bassHighIsMuted
    )

    muteButton.textContent = bassHighIsMuted
      ? "play"
      : "mute"
  })
}

function initBassHighSynth() {
  if (bassHighSynth) return

  bassHighVolume = new Tone.Volume(-30).toDestination()

  bassHighSynth = new Tone.Synth(
    bassHighSynthSettings
  ).connect(bassHighVolume)

  bassHighPart = new Tone.Part((time, note) => {
    bassHighSynth.triggerAttackRelease(
      note.noteName,
      note.duration,
      time,
      note.velocity
    )
  }, bassHighSequence)

  bassHighPart.start(0)

  initBassHighVolumeControl()
  initBassHighMuteControl()
}

export { initBassHighSynth }