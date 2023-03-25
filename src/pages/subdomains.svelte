<script>
  import service from "./subdomains";

  // states
  const [LOADING, READY] = ["loading", "ready"];
  const send = $service.send;
  $: current = $service.machine.current;
  $: context = $service.context;
</script>

{#if current === LOADING}
  <div class="grid items-center justify-center bg-[#f2f3f4] min-h-screen">
    <img
      src="https://arweave.net/IkMJRqi_0Xx_QhstK4WE3rsQqQxC07n84UagPgqGXfc"
      alt="loading"
    />
  </div>
{:else if current === READY}
  <div class="text-4xl">SubDomains</div>
  {#each context.ants as ant}
    <div class="card">
      <div class="card-body">
        <a class="link" href="https://{ant.name}.g8way.io">{ant.name}</a>
      </div>
    </div>
  {/each}
{/if}
