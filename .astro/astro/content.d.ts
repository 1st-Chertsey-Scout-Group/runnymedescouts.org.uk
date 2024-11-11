declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		
	};

	type DataEntryMap = {
		"events": {
"2023-1-18-beaver-leader-meeting-postponed": {
	id: "2023-1-18-beaver-leader-meeting-postponed";
  collection: "events";
  data: InferEntrySchema<"events">
};
"2023-1-19-cub-leader-meeting": {
	id: "2023-1-19-cub-leader-meeting";
  collection: "events";
  data: InferEntrySchema<"events">
};
"2023-1-25-scout-leader-meeting": {
	id: "2023-1-25-scout-leader-meeting";
  collection: "events";
  data: InferEntrySchema<"events">
};
"2023-1-27-cub-quiz": {
	id: "2023-1-27-cub-quiz";
  collection: "events";
  data: InferEntrySchema<"events">
};
"2023-11-17-scout-night-hikecamp": {
	id: "2023-11-17-scout-night-hikecamp";
  collection: "events";
  data: InferEntrySchema<"events">
};
"2023-11-24-cub-night-hike": {
	id: "2023-11-24-cub-night-hike";
  collection: "events";
  data: InferEntrySchema<"events">
};
"2023-12-5-cub-christingle": {
	id: "2023-12-5-cub-christingle";
  collection: "events";
  data: InferEntrySchema<"events">
};
"2023-12-9-cub-big-day-out": {
	id: "2023-12-9-cub-big-day-out";
  collection: "events";
  data: InferEntrySchema<"events">
};
"2023-2-12-county-cub-quiz": {
	id: "2023-2-12-county-cub-quiz";
  collection: "events";
  data: InferEntrySchema<"events">
};
"2023-2-3-beaver-movie-night": {
	id: "2023-2-3-beaver-movie-night";
  collection: "events";
  data: InferEntrySchema<"events">
};
"2023-3-25-beaver-adventure-day": {
	id: "2023-3-25-beaver-adventure-day";
  collection: "events";
  data: InferEntrySchema<"events">
};
"2023-3-4-cub-big-splash": {
	id: "2023-3-4-cub-big-splash";
  collection: "events";
  data: InferEntrySchema<"events">
};
"2023-4-23-st-georges-day-parade": {
	id: "2023-4-23-st-georges-day-parade";
  collection: "events";
  data: InferEntrySchema<"events">
};
"2023-4-30-cub-cooking-competition": {
	id: "2023-4-30-cub-cooking-competition";
  collection: "events";
  data: InferEntrySchema<"events">
};
"2023-5-11-scout-leader-meeting": {
	id: "2023-5-11-scout-leader-meeting";
  collection: "events";
  data: InferEntrySchema<"events">
};
"2023-5-14-county-cub-cooking": {
	id: "2023-5-14-county-cub-cooking";
  collection: "events";
  data: InferEntrySchema<"events">
};
"2023-5-19-county-scout-expedition-challenge": {
	id: "2023-5-19-county-scout-expedition-challenge";
  collection: "events";
  data: InferEntrySchema<"events">
};
"2023-5-27-cub-fishing-competition": {
	id: "2023-5-27-cub-fishing-competition";
  collection: "events";
  data: InferEntrySchema<"events">
};
"2023-5-3-cub-leader-meeting": {
	id: "2023-5-3-cub-leader-meeting";
  collection: "events";
  data: InferEntrySchema<"events">
};
"2023-6-10-beaver-archery-day": {
	id: "2023-6-10-beaver-archery-day";
  collection: "events";
  data: InferEntrySchema<"events">
};
"2023-6-17-scram": {
	id: "2023-6-17-scram";
  collection: "events";
  data: InferEntrySchema<"events">
};
"2023-6-30-cub-football-comp": {
	id: "2023-6-30-cub-football-comp";
  collection: "events";
  data: InferEntrySchema<"events">
};
"2023-6-30-scout-expedition-camp": {
	id: "2023-6-30-scout-expedition-camp";
  collection: "events";
  data: InferEntrySchema<"events">
};
"2023-8-17-kix": {
	id: "2023-8-17-kix";
  collection: "events";
  data: InferEntrySchema<"events">
};
"2023-9-22-cub-camp": {
	id: "2023-9-22-cub-camp";
  collection: "events";
  data: InferEntrySchema<"events">
};
"2023-9-29-scout-camp": {
	id: "2023-9-29-scout-camp";
  collection: "events";
  data: InferEntrySchema<"events">
};
"2023-9-5-cub-leader-meeting": {
	id: "2023-9-5-cub-leader-meeting";
  collection: "events";
  data: InferEntrySchema<"events">
};
"2023-9-6-scout-leader-meeting": {
	id: "2023-9-6-scout-leader-meeting";
  collection: "events";
  data: InferEntrySchema<"events">
};
"2023-9-8-beaver-camp": {
	id: "2023-9-8-beaver-camp";
  collection: "events";
  data: InferEntrySchema<"events">
};
"2024-1-24-cub-leader-meeting": {
	id: "2024-1-24-cub-leader-meeting";
  collection: "events";
  data: InferEntrySchema<"events">
};
"2024-10-12-beavers-archery": {
	id: "2024-10-12-beavers-archery";
  collection: "events";
  data: InferEntrySchema<"events">
};
"2024-11-22-cub-night-hike": {
	id: "2024-11-22-cub-night-hike";
  collection: "events";
  data: InferEntrySchema<"events">
};
"2024-11-5-cub-leaders-meeting-skittles-night": {
	id: "2024-11-5-cub-leaders-meeting-skittles-night";
  collection: "events";
  data: InferEntrySchema<"events">
};
"2024-12-10-cub-christingle": {
	id: "2024-12-10-cub-christingle";
  collection: "events";
  data: InferEntrySchema<"events">
};
"2024-12-7-cub-big-day-out": {
	id: "2024-12-7-cub-big-day-out";
  collection: "events";
  data: InferEntrySchema<"events">
};
"2024-2-25-county-cub-quiz": {
	id: "2024-2-25-county-cub-quiz";
  collection: "events";
  data: InferEntrySchema<"events">
};
"2024-2-3-beaver-movie-night": {
	id: "2024-2-3-beaver-movie-night";
  collection: "events";
  data: InferEntrySchema<"events">
};
"2024-2-4-cub-quiz": {
	id: "2024-2-4-cub-quiz";
  collection: "events";
  data: InferEntrySchema<"events">
};
"2024-3-2-cub-big-splash": {
	id: "2024-3-2-cub-big-splash";
  collection: "events";
  data: InferEntrySchema<"events">
};
"2024-4-13-kinder-scout-walk-weekend": {
	id: "2024-4-13-kinder-scout-walk-weekend";
  collection: "events";
  data: InferEntrySchema<"events">
};
"2024-4-21-st-georges-day-parade-tbc": {
	id: "2024-4-21-st-georges-day-parade-tbc";
  collection: "events";
  data: InferEntrySchema<"events">
};
"2024-4-23-st-georges-day": {
	id: "2024-4-23-st-georges-day";
  collection: "events";
  data: InferEntrySchema<"events">
};
"2024-4-27-county-cub-leaders-camp": {
	id: "2024-4-27-county-cub-leaders-camp";
  collection: "events";
  data: InferEntrySchema<"events">
};
"2024-4-28-county-cub-cooking-comp": {
	id: "2024-4-28-county-cub-cooking-comp";
  collection: "events";
  data: InferEntrySchema<"events">
};
"2024-4-28-ramble": {
	id: "2024-4-28-ramble";
  collection: "events";
  data: InferEntrySchema<"events">
};
"2024-5-11-celebration-event": {
	id: "2024-5-11-celebration-event";
  collection: "events";
  data: InferEntrySchema<"events">
};
"2024-5-7-cub-leader-meeting": {
	id: "2024-5-7-cub-leader-meeting";
  collection: "events";
  data: InferEntrySchema<"events">
};
"2024-6-21-cub-football-comp": {
	id: "2024-6-21-cub-football-comp";
  collection: "events";
  data: InferEntrySchema<"events">
};
"2024-6-23-beaver-paddle-day": {
	id: "2024-6-23-beaver-paddle-day";
  collection: "events";
  data: InferEntrySchema<"events">
};
"2024-6-28-scoutabout": {
	id: "2024-6-28-scoutabout";
  collection: "events";
  data: InferEntrySchema<"events">
};
"2024-7-14-beaver-paddle-day": {
	id: "2024-7-14-beaver-paddle-day";
  collection: "events";
  data: InferEntrySchema<"events">
};
"2024-7-16-cub-leaders-social-pelican-pub": {
	id: "2024-7-16-cub-leaders-social-pelican-pub";
  collection: "events";
  data: InferEntrySchema<"events">
};
"2024-9-20-cub-camp": {
	id: "2024-9-20-cub-camp";
  collection: "events";
  data: InferEntrySchema<"events">
};
"2024-9-4-cub-leader-meeting": {
	id: "2024-9-4-cub-leader-meeting";
  collection: "events";
  data: InferEntrySchema<"events">
};
};
"groups": {
"addlestone-1st-4th/index": {
	id: "addlestone-1st-4th/index";
  collection: "groups";
  data: InferEntrySchema<"groups">
};
"addlestone-5th/index": {
	id: "addlestone-5th/index";
  collection: "groups";
  data: InferEntrySchema<"groups">
};
"chertsey-1st/index": {
	id: "chertsey-1st/index";
  collection: "groups";
  data: InferEntrySchema<"groups">
};
"egham-1st/index": {
	id: "egham-1st/index";
  collection: "groups";
  data: InferEntrySchema<"groups">
};
"egham-hythe-1st/index": {
	id: "egham-hythe-1st/index";
  collection: "groups";
  data: InferEntrySchema<"groups">
};
"englefield-green-1st/index": {
	id: "englefield-green-1st/index";
  collection: "groups";
  data: InferEntrySchema<"groups">
};
"new-haw-1st/index": {
	id: "new-haw-1st/index";
  collection: "groups";
  data: InferEntrySchema<"groups">
};
"new-haw-2nd/index": {
	id: "new-haw-2nd/index";
  collection: "groups";
  data: InferEntrySchema<"groups">
};
"ottershaw-1st/index": {
	id: "ottershaw-1st/index";
  collection: "groups";
  data: InferEntrySchema<"groups">
};
"thorpe-2nd/index": {
	id: "thorpe-2nd/index";
  collection: "groups";
  data: InferEntrySchema<"groups">
};
"virginia-water-1st/index": {
	id: "virginia-water-1st/index";
  collection: "groups";
  data: InferEntrySchema<"groups">
};
};
"units": {
"endeavour-esu/index": {
	id: "endeavour-esu/index";
  collection: "units";
  data: InferEntrySchema<"units">
};
"intrepid-esu/index": {
	id: "intrepid-esu/index";
  collection: "units";
  data: InferEntrySchema<"units">
};
"phoenix-esu/index": {
	id: "phoenix-esu/index";
  collection: "units";
  data: InferEntrySchema<"units">
};
};

	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
