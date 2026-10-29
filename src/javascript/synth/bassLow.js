import * as Tone from "tone"
import { bassLowSequence } from "../parts/bassLowPart.js"

const bassLowSynthSettings = {
    oscillator: {
        type: "sine"
    },
    envelope: {
        attack: 0.1,
        decay: 0.3,
        sustain: 0.8,
        release: 1.5
    }
}

let bassLowSynth = null
let bassLowPart = null
let bassLowVolume = null
let bassLowIsMuted = false

function initBassLowVolumeControl() {
  const volumeInput = document.querySelector("#bass-low-volume")

  volumeInput.addEventListener("input", () => {
    const value = Number(volumeInput.value)

    bassLowVolume.volume.rampTo(value, 0.05)
    bassLowVolume.mute = bassLowIsMuted
  })
}

function initBassLowMuteControl() {
  const muteButton = document.querySelector("#bass-low-mute")

  muteButton.addEventListener("click", () => {
    bassLowIsMuted = !bassLowIsMuted
    bassLowVolume.mute = bassLowIsMuted

    muteButton.classList.toggle(
      "mute__button--active",
      bassLowIsMuted
    )

    muteButton.textContent = bassLowIsMuted
      ? "play"
      : "mute"
  })
}

function initBassLowSynth() {
    if (bassLowSynth) return

    bassLowVolume = new Tone.Volume(-25).toDestination()

    bassLowSynth = new Tone.Synth(
        bassLowSynthSettings
    ).connect(bassLowVolume)

    bassLowPart = new Tone.Part((time, note) => {
        bassLowSynth.triggerAttackRelease(
            note.noteName,
            note.duration,
            time,
            note.velocity
        )
    }, bassLowSequence)

    bassLowPart.start(0)

    initBassLowVolumeControl()
    initBassLowMuteControl()
}

export { initBassLowSynth }