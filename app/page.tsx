import { WEBSITE_URL } from "@/constants"
import { NounsBuildToken } from "@/types"
import { getFrameMetadata } from "frog/next"
import type { Metadata } from "next"
import Image from "next/image"

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const frameTags = await getFrameMetadata(
    `${WEBSITE_URL}/api`,
  )
  return {
    other: frameTags,
  }
}

export default async function Home() {
  const res = await fetch(`${WEBSITE_URL}/api/auction`, { cache: "no-store" })
  const nounsBuildToken = await res.json() as NounsBuildToken

  // console.log(nounsBuildToken)

  return (
    <main
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "black",
        fontWeight: "bolder",
      }}
    >
      {nounsBuildToken ? (
        <Image
          alt="Gnars"
          width={"512"}
          height={"512"}
          src={`https://wrpcd.net/cdn-cgi/image/fit=contain,f=auto,/${nounsBuildToken.image}`}
        />
      ) : null}
    </main>
  )
}
