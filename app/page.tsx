import { WEBSITE_URL } from "@/constants"
import { NounsBuildToken } from "@/types"
import { fetchNounsBuild } from "@/utils"
import { getFrameMetadata } from "frog/next"
import type { Metadata } from "next"
import Image from "next/image"

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const frameTags = await getFrameMetadata(
    `${WEBSITE_URL}/api`,
  )
  return {
    other: frameTags,
  }
}

export default async function Home() {
  const nounsBuildToken = await fetchNounsBuild() as NounsBuildToken

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
          src={nounsBuildToken.image}
        />
      ) : null}
    </main>
  )
}
