import useNewContractMsg from "../terra/useNewContractMsg"
import { gt } from "../libs/math"
import { useContractsAddress, useContract, useRefetch } from "../hooks"
import Count from "../components/Count"
import useBurnReceipt from "./receipts/useBurnReceipt"
import FormContainer from "./FormContainer"

interface Props {
  token?: string
  tab: Tab
}

const BurnForm = ({ token, tab }: Props) => {
  /* context */
  const { contracts, getToken } = useContractsAddress()
  const { find } = useContract()
  useRefetch([])

  const a = "0"
  const b = "0"

  /* confirm */
  const contents = [
    {
      title: "A",
      content: <Count>{a}</Count>,
    },
    {
      title: "B",
      content: <Count>{b}</Count>,
    },
  ]

  /* submit */
  const newContractMsg = useNewContractMsg()
  const data = [
    newContractMsg(contracts["mint"], {
      _: {},
    }),
  ]

  const disabled = !gt(b, 0)

  /* result */
  const parseTx = useBurnReceipt()

  const container = { contents, disabled, data, parseTx }
  const props = { tab, label: tab.current }

  return <FormContainer {...container} {...props} />
}

export default BurnForm
