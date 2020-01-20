import path from "path"
import React from "react"
import reactTestRenderer from "react-test-renderer"

const indexModule = (process.env.MAIN ? path.resolve(process.env.MAIN) : path.join(__dirname, "..", "src")) |> require

/**
 * @type { import("../src") }
 */
const {default: ReactModernPicture} = indexModule

it("should run", () => {
  const input = "https://i.imgur.com/5NfvQ7y.jpg"
  const dom = <ReactModernPicture input={input}/>
  const result = reactTestRenderer.create(dom).toJSON()
  expect(result.type).toStrictEqual("img")
  expect(result.props.src).toStrictEqual(input)
})

it("should run with advanced input", () => {
  const input = {
    webp: {
      srcset: "dog.webp",
      type: "image/webp",
    },
    fallback: {
      srcset: "dog.jpeg",
      type: "image/jpeg",
    },
    img: {
      src: "dog.jpeg",
      alt: "Dog",
    },
  }
  const dom = <ReactModernPicture input={input}/>
  const result = reactTestRenderer.create(dom).toJSON()
  expect(result.type).toStrictEqual("picture")
  debugger
})