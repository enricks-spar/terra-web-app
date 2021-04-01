import { compose, descend, prop, sortWith } from "ramda"
import { UUSD } from "../constants"
import { gte, number, sum } from "../libs/math"

const sortPositions = sortWith<CDP>([
  descend(compose((token) => token === UUSD, prop("collateralToken"))),
  descend(compose(number, prop("mintAmount"))),
])

const findPositions = (balance: string, cdps: CDP[]) =>
  sortPositions(cdps).reduce<CDP[]>((acc, cur) => {
    const accTotal = sum(acc.map(({ mintAmount }) => mintAmount))
    return gte(accTotal, balance) ? acc : [...acc, cur]
  }, [])

export default findPositions
