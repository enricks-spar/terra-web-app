import { groupBy } from "ramda"
import BigNumber from "bignumber.js"
import { Msg } from "@terra-money/terra.js"

import { formatAsset } from "../libs/parse"
import { sum } from "../libs/math"
import { toBase64 } from "../libs/formHelpers"

import useNewContractMsg from "../terra/useNewContractMsg"
import { useContractsAddress, useContract } from "../hooks"
import { PriceKey } from "../hooks/contractKeys"

import useBurnReceipt from "./receipts/useBurnReceipt"
import FormContainer from "./FormContainer"

interface Props {
  tab: Tab
  token: string
  positions: CDP[]
}

interface PositionItem extends CDP {
  collateral: string
}

const BurnForm = ({ tab, token, positions }: Props) => {
  const priceKey = PriceKey.ORACLE

  /* context */
  const { contracts, getSymbol } = useContractsAddress()
  const { find } = useContract()

  const list = positions.map((item) => {
    const { mintAmount, collateralToken } = item
    const collateralPrice = find(priceKey, collateralToken)
    const price = new BigNumber(find(priceKey, token)).div(collateralPrice)

    const collateral = price
      .times(mintAmount)
      .integerValue(BigNumber.ROUND_FLOOR)
      .toString()

    return { ...item, collateral }
  })

  /* confirm */
  const contents = [
    {
      title: "Return Amount",
      content: Object.entries(byCollateralToken(list))
        .map(([collateralToken, list]) =>
          formatAsset(
            sum(list.map(({ collateral }) => collateral)),
            getSymbol(collateralToken)
          )
        )
        .join(" + "),
    },
  ]

  /* submit */
  const newContractMsg = useNewContractMsg()
  const createSend = (msg: object, amount?: string) => ({
    send: { amount, contract: contracts["mint"], msg: toBase64(msg) },
  })

  const getData = ({ id, mintAmount, collateral }: PositionItem) => {
    const withdraw = { withdraw: { position_idx: id, collateral } }
    const burn = { burn: { position_idx: id } }

    return [
      newContractMsg(token, createSend(burn, mintAmount)),
      newContractMsg(contracts["mint"], withdraw),
    ]
  }

  const data = list.reduce<Msg[]>((acc, cur) => [...acc, ...getData(cur)], [])

  /* result */
  const parseTx = useBurnReceipt()
  const container = { contents, data, parseTx }
  const props = { tab, label: tab.current }

  return <FormContainer {...container} {...props} />
}

export default BurnForm

/* helpers */
const byCollateralToken = groupBy<PositionItem>(
  ({ collateralToken }) => collateralToken
)
