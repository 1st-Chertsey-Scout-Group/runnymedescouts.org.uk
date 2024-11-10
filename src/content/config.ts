import { defineCollection, z } from "astro:content";

const groupsCollection = defineCollection({
    type: "data",
    schema: ({ image }) =>
        z.object({
            name: z.string(),
            image: image(),
            url: z.string().optional()
        }),
});

const unitsCollection = defineCollection({
    type: "data",
    schema: ({ image }) =>
        z.object({
            name: z.string(),
            image: image(),
            url: z.string().optional()
        }),
});

export const collections = {
    groups: groupsCollection,
    units: unitsCollection,
};