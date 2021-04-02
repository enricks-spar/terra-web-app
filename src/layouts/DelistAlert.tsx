import { uniq } from "ramda"
import useMy from "../pages/My/useMy"
import DelistModal from "./DelistModal"

const DelistAlert = () => {
  const my = useMy()
  const { holdings, mint, pool, stake, orders } = my

  const delistedHoldings = holdings.dataSource.filter(filter).map(getToken)

  const delistedMintTokens = mint.dataSource
    .filter(filter)
    .reduce<string[]>(
      (acc, { collateral, asset }) =>
        acc
          .concat(collateral.delisted ? collateral.token : [])
          .concat(asset.delisted ? asset.token : []),
      []
    )

  const delistedPoolTokens = pool.dataSource.filter(filter).map(getToken)
  const delistedStakedTokens = stake.dataSource.filter(filter).map(getToken)
  const delistedOrderTokens = orders.dataSource
    .filter(filter)
    .map(({ asset }) => asset.token)

  const delistedTokens = uniq([
    ...delistedHoldings,
    ...delistedMintTokens,
    ...delistedPoolTokens,
    ...delistedStakedTokens,
    ...delistedOrderTokens,
  ])

  return delistedTokens.length ? <DelistModal tokens={delistedTokens} /> : null
}

export default DelistAlert

/* helpers */
const filter = <T extends { status: ListedItemStatus }>({ status }: T) =>
  status === "DELISTED"

const getToken = <T extends { token: string }>({ token }: T) => token
