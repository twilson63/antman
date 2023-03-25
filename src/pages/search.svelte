<script>
  import service from "./search";

  // states
  const [LOADING, READY] = ["loading", "ready"];
  const send = $service.send;
  $: current = $service.machine.current;
  $: context = $service.context;

  async function handleSearch(e) {
    const q = e.target.q.value;

    if (context.subs.includes(q)) {
      alert("Registered!");
    } else {
      alert("Not Registered!");
    }
    e.target.reset();
  }
</script>

{#if current === LOADING}
  <div class="grid items-center justify-center bg-[#f2f3f4] min-h-screen">
    <img
      src="https://arweave.net/IkMJRqi_0Xx_QhstK4WE3rsQqQxC07n84UagPgqGXfc"
      alt="loading"
    />
  </div>
{:else if current === READY}
  <div class="hero min-h-screen">
    <div class="hero-content">
      <form
        class="flex flex-col space-y-2"
        on:submit|preventDefault={handleSearch}
      >
        <input
          type="text"
          class="input input-bordered"
          placeholder="sub-domains"
          name="q"
        />
        <button class="btn">Search</button>
      </form>
    </div>
  </div>
{/if}
