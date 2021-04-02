import Modal, { useModal } from "../containers/Modal"
import styles from "./DelistModal.module.scss"

const DelistModal = () => {
  const modal = useModal(true)

  return (
    <Modal {...modal}>
      <p>
        The following asset will be delisted due to a stock split / merge on
        2021.05.24 00:00:00 (UTC)
      </p>

      <section>mKSU</section>

      <p>
        Delisted assets can be sent, withdrawn from liquidity pools and used to
        close existing mint positions.
        <br />
        Delisted assets cannot be traded, minted or provided to liquidity pools.
        LP staking rewards will immediately stop.
        <br />
        You may burn your mKSU (delisted) and claim UST at the last price before
        stock split / merge event.
      </p>

      <section>1 mKSU (delisted) = 130.02UST</section>

      <p>
        You may trade, mint, provide liquidity for and stake LP tokens for the
        new asset immediately after the stock split / merge.
        <br />
        Note that when UST to be returned after burning becomes insufficient,
        you may receive other mAssets. Please close mint positions with
        collateral other than UST before or immediately after stock split /
        merge to avoid any losses.
      </p>
    </Modal>
  )
}

export default DelistModal
