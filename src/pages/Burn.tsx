import { useLocation } from "react-router-dom"
import { MenuKey } from "../routes"
import { useRefetch } from "../hooks"
import { PriceKey } from "../hooks/contractKeys"
import Page from "../components/Page"
import BurnForm from "../forms/BurnForm"

const Burn = () => {
  const keys = [PriceKey.ORACLE]
  useRefetch(keys)

  const tab = { tabs: [MenuKey.BURN], current: MenuKey.BURN }
  const { state } = useLocation<{ token: string }>()
  const token = state?.token

  return (
    <Page title={MenuKey.BURN} doc="/user-guide/getting-started/mint-and-burn">
      {token && <BurnForm tab={tab} />}
    </Page>
  )
}

export default Burn
