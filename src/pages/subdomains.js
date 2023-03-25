import { createMachine, state, transition, invoke, reduce } from 'robot3';
import { useMachine } from 'svelte-robot-factory';
import API from '../lib'
import services from '../services'

const api = API.init(services)

const machine = createMachine({
  //idle: state(),
  loading: invoke(
    () => api.myANTs('vh-NTHVvlKZqRxc8LyyTNok65yQ55a_PJ1zWLb9G2JI')
      .toPromise(),
    transition('done', 'ready', reduce((ctx, ev) => ({ ...ctx, ants: ev.data })))
  ),
  ready: state()
});

const service = useMachine(machine, () => null);
export default service;