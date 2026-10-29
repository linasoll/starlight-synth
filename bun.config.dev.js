import index from "./src/index.html"

const server = Bun.serve({
  port: 3000,

  routes: {
    "/": index,

    "/samples/hi-hat-sample.wav": () => {
      return new Response(
        Bun.file("./src/samples/hi-hat-sample.wav")
      )
    },

    "/samples/rain-sample.wav": () => {
      return new Response(
        Bun.file("./src/samples/rain-sample.wav")
      )
    }
  }
})

console.log(`Listening on ${server.url}`)