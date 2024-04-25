/** @jsxImportSource frog/jsx */

import { SenditABIts } from "@/abis/sendit"
import { Button, Frog, TextInput } from "frog"
import { devtools } from "frog/dev"
import { handle } from "frog/next"
import { serveStatic } from "frog/serve-static"
import { parseUnits } from "viem"

const app = new Frog({
  assetsPath: "/",
  basePath: "/api",
})

app.frame("/", (c) => {
  const { buttonValue, inputText, status } = c
  return c.res({
    image: (
      <div
        style={{
          color: "black",
          backgroundColor: "#C4FF09",
          width: "100%",
          height: "100%",
          fontSize: 60,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Tip 333 $SENDIT
      </div>
    ),
    intents: [
      <TextInput placeholder="Address" />,
      <Button.Transaction target="/mint">Send it ↗</Button.Transaction>,
    ],
  })
})

app
.transaction('/mint', (c) => {
  const { inputText } = c
  return c.contract({
    abi: SenditABIts,
    to: "0xba5b9b2d2d06a9021eb3190ea5fb0e02160839a4",
    chainId: 'eip155:8453',
    functionName: 'transfer',
    args: [inputText as `0x${string}`, parseUnits("333", 18)],
  })
})

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
