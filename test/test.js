import path from "path"
import React from "react"
import reactTestRenderer from "react-test-renderer"

const indexModule = (process.env.MAIN ? path.resolve(process.env.MAIN) : path.join(__dirname, "..", "src")) |> require

/**
 * @type { import("../src") }
 */
const {default: ReactModernPicture} = indexModule


it("should run", () => {
  const src = "https://i.imgur.com/5NfvQ7y.jpg"
  const dom = <ReactModernPicture input={src}/>
  const result = reactTestRenderer.create(dom).toJSON()
  expect(result.type).toStrictEqual("img")
  expect(result.props.src).toStrictEqual(src)
})