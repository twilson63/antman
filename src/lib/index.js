import { Async } from 'crocks'
import { filter, compose, startsWith, prop, map } from 'ramda'

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
        .chain(antDetails)
    })
  }
}