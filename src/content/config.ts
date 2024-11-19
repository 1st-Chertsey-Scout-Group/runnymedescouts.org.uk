import { defineCollection, z } from "astro:content";

const groupsCollection = defineCollection({
    type: "data",
    schema: ({ image }) =>
        z.object({
            name: z.string(),

            location: z.string(),
            mapLink: z.string(),

            image: image(),

            facebook: z.string().optional(),
            website: z.string().optional(),
            contact: z.string().optional()
        }),
});

const unitsCollection = defineCollection({
    type: "data",
    schema: ({ image }) =>
        z.object({
            name: z.string(),

            location: z.string(),
            mapLink: z.string(),

            image: image(),

            facebook: z.string().optional(),
            website: z.string().optional(),
            contact: z.string().optional()
        }),
});

const eventsCollection = defineCollection({
    type: "data",
    schema: () =>
        z.object({
            startDate: z.string(),
            endDate: z.string().optional(),
            title: z.string(),
            details: z.string().optional()
        }),
});

export const collections = {
    groups: groupsCollection,
    units: unitsCollection,
    events: eventsCollection,
};