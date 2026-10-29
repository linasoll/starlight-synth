import * as Tone from "tone"
import rainUrl from "../../samples/rain-sample.wav"

let rainPlayer = null
let rainVolume = null
let rainIsMuted = false

function initRainVolumeControl() {
  const volumeInput = document.querySelector("#rain-volume")

  volumeInput.addEventListener("input", () => {
    const value = Number(volumeInput.value)

    rainVolume.volume.rampTo(value, 0.05)
    rainVolume.mute = rainIsMuted
  })
}

function initRainMuteControl() {
  const muteButton = document.querySelector("#rain-mute")

  muteButton.addEventListener("click", () => {
    rainIsMuted = !rainIsMuted
    rainVolume.mute = rainIsMuted

    muteButton.classList.toggle(
      "mute__button--active",
      rainIsMuted
    )

    muteButton.textContent = rainIsMuted
      ? "play"
      : "mute"
  })
}

function initRain() {
    if (rainPlayer) return

    rainVolume = new Tone.Volume(-22).toDestination()

    rainPlayer = new Tone.Player({
        url: rainUrl,
        loop: true,
        fadeIn: 2,
        fadeOut: 2
    }).connect(rainVolume)

    rainPlayer.sync().start(0)

    initRainVolumeControl()
    initRainMuteControl()
}

export { initRain }