import * as Tone from "tone"

import {
  hiHatsSequences
} from "../parts/hiHatsPart.js"

import hiHatUrl from "../../samples/hi-hat-sample.wav"

let hiHatsSampler = null
let hiHatsParts = []
let hiHatsVolume = null
let hiHatsIsMuted = false

function initHiHatsVolumeControl() {
  const volumeInput = document.querySelector("#hi-hats-volume")

  volumeInput.addEventListener("input", () => {
    const value = Number(volumeInput.value)

    hiHatsVolume.volume.rampTo(value, 0.05)
    hiHatsVolume.mute = hiHatsIsMuted
  })
}

function initHiHatsMuteControl() {
  const muteButton = document.querySelector("#hi-hats-mute")

  muteButton.addEventListener("click", () => {
    hiHatsIsMuted = !hiHatsIsMuted
    hiHatsVolume.mute = hiHatsIsMuted

    muteButton.classList.toggle(
      "mute__button--active",
      hiHatsIsMuted
    )

    muteButton.textContent = hiHatsIsMuted
      ? "play"
      : "mute"
  })
}

function initHiHatsSynth() {
  if (hiHatsSampler) return

  hiHatsVolume = new Tone.Volume(-30).toDestination()

  hiHatsSampler = new Tone.Sampler({
  urls: {
    C1: hiHatUrl
  }
}).connect(hiHatsVolume)

  hiHatsParts = hiHatsSequences.map((sequence) => {
    return new Tone.Part((time, note) => {
      hiHatsSampler.triggerAttackRelease(
        note.noteName,
        note.duration,
        time,
        note.velocity
      )
    }, sequence).start(0)
  })

  hiHatsParts.forEach((part) => {
    part.mute = true
  })

  initHiHatsVolumeControl()
  initHiHatsMuteControl()
}

export {
  initHiHatsSynth,
  hiHatsParts
}