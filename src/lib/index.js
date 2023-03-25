import { Async } from 'crocks'
import { filter, compose, startsWith, prop, map, keys } from 'ramda'

const ARNS_TEST = 'bLAgYxAdX2Ry-nt6aH2ixgvJXbpsEYm28NgJgyqfs-U'

// @ts-ignore
const { fromPromise, all } = Async

export default {
  init: ({ contractsByWallet, readState }) => {
    const antDetails = (txs) => all(
      map(
        compose(
          fromPromise(readState),
          prop('contract_tx_id')
        ),
        txs
      )
    )

    return Object.freeze({
      myANTs: (address) => fromPromise(contractsByWallet)(address)
        .map(filter(compose(
          startsWith('ANT'),
          prop('token_ticker')
        )))
        .chain(antDetails),
      getSubdomains: () => fromPromise(readState)(ARNS_TEST).map(
        compose(
          keys,
          prop('records')
        )
      )
    })
  }
}