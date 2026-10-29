import * as Tone from "tone"

import {
  initLamps,
  stopLamps,
  setPlayingState,
  setPausedState,
  setStoppedState
} from "./javascript/ui.js"

import {
  initMelodySynth,
  melodyParts
} from "./javascript/synth/melody.js"

import {
  initHarmonySynth,
  harmonyParts
} from "./javascript/synth/harmony.js"

import {
  initHiHatsSynth,
  hiHatsParts
} from "./javascript/synth/hiHats.js"

import {
  initBassHighSynth
} from "./javascript/synth/bassHigh.js"

import { initBassLowSynth } from "./javascript/synth/bassLow.js"

import { initRain } from "./javascript/synth/rain.js"

initMelodySynth()
initHarmonySynth()
initHiHatsSynth()
initBassHighSynth()
initBassLowSynth()
initRain()

Tone.Transport.bpm.value = 100

Tone.Transport.loop = true
Tone.Transport.loopStart = 0
Tone.Transport.loopEnd = "8m"

const playButton = document.querySelector("#play")
const pauseButton = document.querySelector("#pause")
const stopButton = document.querySelector("#stop")

playButton.addEventListener("click", async () => {
  if (playButton.disabled) return

  await Tone.start()
  await Tone.loaded()

  Tone.Transport.start()

  initLamps()
  setPlayingState()
})

pauseButton.addEventListener("click", () => {
  if (pauseButton.disabled) return

  Tone.Transport.pause()

  setPausedState()
  stopLamps()
})

stopButton.addEventListener("click", () => {
  if (stopButton.disabled) return

  Tone.Transport.stop()
  Tone.Transport.position = "0:0:0"

  setStoppedState()
  stopLamps()
})

const melodyButtons = [
  document.querySelector("#melody__sequence-1"),
  document.querySelector("#melody__sequence-2"),
  document.querySelector("#melody__sequence-3"),
  document.querySelector("#melody__sequence-4")
]

melodyParts.forEach((part) => {
  part.mute = true
})

melodyButtons.forEach((button, index) => {
  button.classList.remove("sequence__button--active")

  button.addEventListener("click", () => {
    melodyParts[index].mute = !melodyParts[index].mute

    button.classList.toggle(
      "sequence__button--active",
      !melodyParts[index].mute
    )
  })
})

const harmonyButtons = [
  document.querySelector("#harmony__sequence-1"),
  document.querySelector("#harmony__sequence-2"),
  document.querySelector("#harmony__sequence-3"),
  document.querySelector("#harmony__sequence-4"),
  document.querySelector("#harmony__sequence-5"),
  document.querySelector("#harmony__sequence-6"),
  document.querySelector("#harmony__sequence-7"),
  document.querySelector("#harmony__sequence-8")
]

harmonyButtons.forEach((button, index) => {
  button.classList.remove("sequence__button--active")

  button.addEventListener("click", () => {
    harmonyParts[index].mute = !harmonyParts[index].mute

    button.classList.toggle(
      "sequence__button--active",
      !harmonyParts[index].mute
    )
  })
})

const hiHatsButtons = [
  document.querySelector("#hi-hats__sequence-1"),
  document.querySelector("#hi-hats__sequence-2"),
  document.querySelector("#hi-hats__sequence-3"),
  document.querySelector("#hi-hats__sequence-4"),
  document.querySelector("#hi-hats__sequence-5"),
  document.querySelector("#hi-hats__sequence-6"),
  document.querySelector("#hi-hats__sequence-7"),
  document.querySelector("#hi-hats__sequence-8")
]

hiHatsButtons.forEach((button, index) => {
  button.classList.remove("sequence__button--active")

  button.addEventListener("click", () => {
    hiHatsParts[index].mute = !hiHatsParts[index].mute

    button.classList.toggle(
      "sequence__button--active",
      !hiHatsParts[index].mute
    )
  })
})