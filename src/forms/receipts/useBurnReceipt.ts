import { formatAsset } from "../../libs/parse"
import { useContractsAddress } from "../../hooks"
import { findValues, splitTokenText } from "./receiptHelpers"

export default () => (logs: TxLog[]) => {
  const { getSymbol } = useContractsAddress()
  const values = findValues(logs)
  const refunds = values("refund_collateral_amount")

  return [
    {
      title: "Refund",
      content: refunds
        ?.map((refund) => {
          const { amount, token } = splitTokenText(refund)
          return formatAsset(amount, getSymbol(token))
        })
        .join(" + "),
    },
  ]
}
