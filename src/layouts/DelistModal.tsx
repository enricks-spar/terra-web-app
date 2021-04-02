import { UST } from "../constants"
import { format } from "../libs/parse"
import { useContract, useContractsAddress } from "../hooks"
import { PriceKey } from "../hooks/contractKeys"
import Card from "../components/Card"
import Modal, { useModal } from "../containers/Modal"
import styles from "./DelistModal.module.scss"

const DelistModal = ({ tokens }: { tokens: string[] }) => {
  const priceKey = PriceKey.ORACLE
  const { getSymbol } = useContractsAddress()
  const { find } = useContract()
  const modal = useModal(true)

  return (
    <Modal {...modal}>
      <Card>
        <p>
          The following asset will be delisted due to a stock split / merge.
        </p>

        <section className={styles.info}>
          {tokens.map(getSymbol).join(", ")}
        </section>

        <p>
          Delisted assets can be sent, withdrawn from liquidity pools and used
          to close existing mint positions.
          <br />
          Delisted assets cannot be traded, minted or provided to liquidity
          pools. LP staking rewards will immediately stop.
          <br />
          You may burn your mKSU (delisted) and claim UST at the last price
          before stock split / merge event.
        </p>

        <section className={styles.info}>
          {tokens.map((token) => (
            <p key={token}>
              {[
                `1 ${getSymbol(token)} (delisted)`,
                `${format(find(priceKey, token))} ${UST}`,
              ].join(" = ")}
            </p>
          ))}
        </section>

        <p>
          You may trade, mint, provide liquidity for and stake LP tokens for the
          new asset immediately after the stock split / merge.
          <br />
          Note that when UST to be returned after burning becomes insufficient,
          you may receive other mAssets. Please close mint positions with
          collateral other than UST before or immediately after stock split /
          merge to avoid any losses.
        </p>
      </Card>
    </Modal>
  )
}

export default DelistModal
