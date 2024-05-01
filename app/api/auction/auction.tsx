import { NounsBuild } from "@/types"
import { load } from "cheerio"

export const dynamic = 'force-dynamic'

export async function GET() {
  console.log("teste")
  const res = await fetch(
    "https://nouns.build/dao/base/0x880fb3cf5c6cc2d7dfc13a993e839a9411200c17",
    { cache: "no-store" }
  )
  const html = await res.text()
  let nounsBuild = undefined

  if (html) {
    const $ = load(html)
    const scriptContent = $(`#__NEXT_DATA__`).html()
    if (scriptContent) {
      try {
        nounsBuild = JSON.parse(scriptContent) as NounsBuild
        console.log("api", nounsBuild.props.pageProps.token.image)
        console.log(nounsBuild)
      } catch (error) {
        console.error("Erro ao parsear JSON:", error)
      }
    }
  }

  return Response.json(nounsBuild)
}
