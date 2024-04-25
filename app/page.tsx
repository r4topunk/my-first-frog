import { getFrameMetadata } from "frog/next"
import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  const frameTags = await getFrameMetadata(
    `${process.env.VERCEL_URL || "http://localhost:3000"}/api`
  )
  return {
    other: frameTags,
  }
}

export default function Home() {
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
        fontSize: "112px",
        backgroundColor: "#C4FF09",
      }}
    >
      <a href="https://sendit.city/">$SENDIT</a>
    </main>
  )
}
