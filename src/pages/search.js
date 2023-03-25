import { createMachine, state, transition, invoke, reduce } from 'robot3';
import { useMachine } from 'svelte-robot-factory';
import API from '../lib'
import services from '../services'

const api = API.init(services)

const machine = createMachine({
  loading: invoke(
    () => api.getSubdomains().toPromise(),
    transition('done', 'ready', reduce((ctx, ev) => ({ ...ctx, subs: ev.data })))
  ),
  ready: state()
});

const service = useMachine(machine, () => null);
export default service;