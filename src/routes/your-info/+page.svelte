<script lang="ts">
	import { getUserInfoStore, AllGenders } from '$lib/user-info.svelte.js';
	import { type Brand } from '$lib/Brand';
	import { SvelteDate } from 'svelte/reactivity';

	const store = getUserInfoStore();
	if (store.value.gender === undefined) store.value.gender = 'Other';
	if (store.value.birthday === undefined) store.value.birthday = new SvelteDate();
	if (store.value.local_life_expectancy === undefined)
		store.value.local_life_expectancy = 72 as Brand<number, 'UserInputLifeExpectancy'>;

	let preselectedGender = store.value.gender;

</script>

<h1>This will be your point for data entry</h1>
<a href="/">Go back to root (debug!)</a>

<h6>But there is lots of work to do here</h6>

<p>Your Gender:</p>
<div class="flex h-fit w-fit flex-row gap-5 rounded-xl border-2 border-gray-500 p-4">
	{#each AllGenders as gender (gender)}
		<div class="flex flex-row gap-2">
			<input
				type="radio"
				name="gender-selection"
				value={gender}
				bind:group={preselectedGender}
				onchange={() => (store.value.gender = gender)}
			/>
			<div>{gender}</div>
		</div>
	{/each}
</div>

<p>Your date of birth:</p>
<input type="date" max="{new Date().getFullYear()}-12-31" bind:value={store.value.birthday} />

<p>Your areas average life expectancy</p>
<input type="number" min="0" step="1" max="200" />
