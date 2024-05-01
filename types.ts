export interface NounsBuild {
  props: Props
  page: string
  query: Query
  buildId: string
  isFallback: boolean
  isExperimentalCompile: boolean
  gssp: boolean
  scriptLoader: any[]
}

interface Props {
  pageProps: PageProps
  __N_SSP: boolean
}

interface PageProps {
  url: string
  collection: string
  name: string
  token: NounsBuildToken
  description: string
  tokenId: string
  addresses: Addresses
  ogImageURL: string
  chainId: number
}

export interface NounsBuildToken {
  tokenId: string
  tokenContract: string
  name: string
  dao: Dao
  image: string
  owner: string
  mintedAt: string
  auction: Auction
}

interface Dao {
  description: string
  name: string
  contractImage: string
  totalSupply: number
  ownerCount: number
  proposalCount: number
  tokenAddress: string
  metadataAddress: string
  auctionAddress: string
  treasuryAddress: string
  governorAddress: string
}

interface Auction {
  winningBid: any
}

interface Addresses {
  token: string
  metadata: string
  treasury: string
  governor: string
  auction: string
}

interface Query {
  network: string
  token: string
  tokenId: string
}