/** @jsxImportSource frog/jsx */

import { abi } from "@/abis/auction"
import { SenditABIts } from "@/abis/sendit"
import { AUCTION_ADDRESS } from "@/constants"
import { NounsBuildToken } from "@/types"
import { fetchNounsBuild } from "@/utils"
import { publicClient } from "@/web3-client"
import { Button, Frog, TextInput } from "frog"
import { devtools } from "frog/dev"
import { handle } from "frog/next"
import { serveStatic } from "frog/serve-static"
import { formatEther, parseUnits } from "viem"

export const revalidate = 60

const app = new Frog({
  assetsPath: "/",
  basePath: "/api",
})

app.frame("/", async (c) => {
  const nounsBuildToken = await fetchNounsBuild() as NounsBuildToken
  const encodedTokenUrl = encodeURIComponent(decodeURIComponent(nounsBuildToken.image))

  const contract = {
    address: AUCTION_ADDRESS,
    abi,
  }

  const reservePrice = await publicClient.readContract({
    ...contract,
    functionName: "reservePrice"
  })

  const auction = await publicClient.readContract({
    ...contract,
    functionName: "auction"
  })

  const minBidIncrement = await publicClient.readContract({
    ...contract,
    functionName: "minBidIncrement"
  })

  const highestBid = auction[1]
  const minBidValue = highestBid ? BigInt(highestBid) + BigInt(minBidIncrement) : reservePrice
  
  return c.res({
    // image: `https://wrpcd.net/cdn-cgi/image/fit=contain,f=auto,/${encodedTokenUrl}`,
    image: encodedTokenUrl,
    imageAspectRatio: "1:1",
    intents: [
      <TextInput placeholder={`Min bid value: ${formatEther(minBidValue)} ETH`} />,
      <Button.Transaction target="/bid">Set bid</Button.Transaction>,
    ],
  })
})

app
.transaction('/bid', async (c) => {
  const { inputText = "0" } = c

  return c.contract({
    abi: SenditABIts,
    to: "0xba5b9b2d2d06a9021eb3190ea5fb0e02160839a4",
    chainId: 'eip155:8453',
    functionName: 'transfer',
    args: ["0x39a7B6fa1597BB6657Fe84e64E3B836c37d6F75d" as `0x${string}`, parseUnits(inputText, 18)],
  })
})

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
