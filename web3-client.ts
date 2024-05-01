import { createPublicClient, http } from "viem"
import { base } from "viem/chains"

export const chain = base

export const publicClient = createPublicClient({
  chain,
  transport: http(),
})