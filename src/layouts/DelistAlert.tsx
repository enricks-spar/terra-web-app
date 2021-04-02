import useMy from "../pages/My/useMy"
import DelistModal from "./DelistModal"

const DelistAlert = () => {
  const my = useMy()
  console.log(my)
  const { holdings, mint, pool, stake, orders } = my

  const hasDelist = [
    holdings,
    mint,
    pool,
    stake,
    orders,
  ].some(({ dataSource }) =>
    dataSource.some(
      ({ status }: { status: ListedItemStatus }) => status === "DELISTED"
    )
  )

  return hasDelist ? <DelistModal /> : null
}

export default DelistAlert
