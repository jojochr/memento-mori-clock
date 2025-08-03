import { SvelteDate } from 'svelte/reactivity';
import { type Brand } from '$lib/Brand';
import { localStore, LocalStore } from '$lib/localStore.svelte';

export const AllGenders = ['Male', 'Female', 'Other'] as const;
export type Gender = (typeof AllGenders)[number];

export type user_info = {
	birthday?: SvelteDate;
	gender?: Gender;
	/** Users can input a country, which will be mapped to a life expectancy, or can specify a life expectancy directly */
	local_life_expectancy?: Brand<number, 'UserInputLifeExpectancy'> | Brand<string, 'CountryOfUser'>;
};

export const getUserInfoStore = (): LocalStore<user_info> => {
	return localStore('UserInfo', {});
};
