import { prop, path } from 'ramda'
import { WarpFactory, LoggerFactory } from 'warp-contracts'

LoggerFactory.INST.logLevel('fatal')
const warp = WarpFactory.forMainnet()

const AGG = 'https://contracts.warp.cc'
const DRE = 'https://cache-2.permaweb.tools/contract'

const options = { allowBigInt: true, internalWrites: true, unsafeClient: 'allow' }
export const contractsByWallet = addr =>
  fetch(`${AGG}/balances?walletAddress=${addr}`)
    .then(res => res.json())
    .then(prop('balances'))

export const readState = tx => warp
  .contract(tx)
  .syncState(DRE, { validity: true })
  .then(c => c.setEvaluationOptions(options))
  .then(c => c.readState())
  .then(path(['cachedValue', 'state']))
