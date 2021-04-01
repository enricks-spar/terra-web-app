import { useParams } from "react-router-dom"
import { gql, useQuery } from "@apollo/client"
import { gt } from "../libs/math"
import { useContract, useRefetch } from "../hooks"
import { BalanceKey, PriceKey } from "../hooks/contractKeys"
import { MenuKey } from "../routes"
import useStatsClient from "../statistics/useStatsClient"
import Page from "../components/Page"
import BurnForm from "../forms/BurnForm"
import findPositions from "../helpers/findPositions"

const Burn = () => {
  const priceKey = PriceKey.ORACLE
  const balanceKey = BalanceKey.TOKEN
  const keys = [priceKey, balanceKey]
  useRefetch(keys)

  const tab = { tabs: [MenuKey.BURN], current: MenuKey.BURN }
  const { find } = useContract()
  const { token } = useParams<{ token: string }>()
  const balance = find(balanceKey, token)

  const cdps = useCDPS(token)
  const positions = gt(balance, 0) && cdps && findPositions(balance, cdps)
  console.log(positions)

  return (
    <Page title={MenuKey.BURN} doc="/user-guide/getting-started/mint-and-burn">
      {token && <BurnForm tab={tab} />}
    </Page>
  )
}

export default Burn

/* hooks */
const QUERY = gql`
  query cdps($tokens: [String!]) {
    cdps(maxRatio: 9999, tokens: $tokens) {
      id
      address
      token
      mintAmount
      collateralToken
      collateralAmount
      collateralRatio
    }
  }
`

const useCDPS = (token: string) => {
  const client = useStatsClient()
  const { data } = useQuery<{ cdps: CDP[] }>(QUERY, {
    client,
    variables: { tokens: [token] },
    skip: !token,
  })

  return data?.cdps
}
