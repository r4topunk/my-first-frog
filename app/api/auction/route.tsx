import { load } from "cheerio"

export const dynamic = 'force-dynamic'

export async function GET() {
  const res = await fetch(
    "https://nouns.build/dao/base/0x880fb3cf5c6cc2d7dfc13a993e839a9411200c17",
    { next: { revalidate: 3600 } }
  )
  const html = await res.text()
  let nounsBuild = null

  if (html) {
    const $ = load(html)
    const scriptContent = $(`#__NEXT_DATA__`).html()
    if (scriptContent) {
      try {
        nounsBuild = JSON.parse(scriptContent)
      } catch (error) {
        console.error("Erro ao parsear JSON:", error)
      }
    }
  }

  return Response.json(nounsBuild?.props.pageProps.token)
}