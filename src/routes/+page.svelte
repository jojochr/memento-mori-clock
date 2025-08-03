<script lang="ts">
	import { onMount } from 'svelte';

	let startDate: Date = new Date();
	startDate.setFullYear(2004);

	let endDate: Date = new Date();
	endDate.setFullYear(startDate.getFullYear() + 70);

	let now: Date = $state(new Date());
	onMount(() => {
		const secondIntervalID = setInterval(() => {
			now = new Date();
		}, 1000);

		return () => clearInterval(secondIntervalID);
	});

	let barWidthInPercent: number | null = $derived(
		((now.getTime() - startDate.getTime()) / (endDate.getTime() - startDate.getTime())) * 100
	);
</script>

<h1>Memento Mori Clock</h1>

<a href="/your-info">Input your info here (tmp!)</a>

<div>Alive Seconds: {Math.round(now.getTime() / 1000 - startDate.getTime() / 1000)}</div>
<div>Seconds left: {Math.round(endDate.getTime() / 1000 - now.getTime() / 1000)}</div>

{#if barWidthInPercent}
	<div class="barContainer">
		<div class="livedBar" style="width: {barWidthInPercent}%"></div>
		<div class="toLiveBar"></div>
	</div>
{/if}

<style>
	.barContainer {
		display: flex;
		flex-direction: row;
		border-radius: var(--radius-4xl);
		border-style: var(--tw-border-style);
		border-width: 2px;
		border-color: var(--color-black);
		background-color: var(--color-blue-900);
		padding: calc(var(--spacing) * 6);
	}

	.livedBar {
		height: calc(var(--spacing) * 20);
		border-top-left-radius: var(--radius-md);
		border-bottom-left-radius: var(--radius-md);
		background-color: var(--color-red-500);
	}

	.toLiveBar {
		height: calc(var(--spacing) * 20);
		width: 100%;
		border-top-right-radius: var(--radius-md);
		border-bottom-right-radius: var(--radius-md);
		background-color: var(--color-green-400);
	}
</style>
