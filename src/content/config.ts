import { defineCollection, reference, z, type ImageFunction } from "astro:content";

const getAddressSchema = () =>
    z.object({
        name: z.string().optional(),
        street: z.string(),
        district: z.string().optional(),
        city: z.string(),
        province: z.string(),
        postalCode: z.string(),
        longitude: z.number(),
        latitude: z.number()
    })

const getGroupSectionsSchema = (image: ImageFunction) => z.object({
    image: image(),
    meetingDay: z.enum(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]),
    meetingEndTime: z.string(),
    meetingStartTime: z.string(),
    name: z.string(),
    section: reference("sections"),
})

const sectionsCollection = defineCollection({
    type: "data",
    schema: () =>
        z.object({
            name: z.string(),
            minAge: z.number(),
            maxAge: z.number(),
            order: z.number()
        }).transform(values => ({
            ...values,
            get age(): string {

                let min = values.minAge.toString().replace(".5", "½");
                let max = values.maxAge.toString().replace(".5", "½");

                return [min, max].join("-");
            }
        }))
})

const groupsCollection = defineCollection({
    type: "content",
    schema: ({ image }) =>
        z.object({
            name: z.string(),
            mapLink: z.string(),
            image: image(),
            facebook: z.string().optional(),
            website: z.string().optional(),
            contact: z.string().optional(),
            enabled: z.boolean().default(true),

            address: getAddressSchema(),

            charityNumber: z.number(),

            sections: z.array(getGroupSectionsSchema(image))
        }).transform(values => ({
            ...values,
            get shortAddress(): string {
                let address = values.address;
                return [address.street, address.postalCode].filter(n => n).join(", ");
            },
            get longAddress(): string {
                let address = values.address;
                return [address.name, address.street, address.district, address.city, address.postalCode].filter(n => n).join(", ");
            }
        })),
});


const unitsCollection = defineCollection({
    type: "content",
    schema: ({ image }) =>
        z.object({
            name: z.string(),
            mapLink: z.string(),
            image: image(),
            facebook: z.string().optional(),
            website: z.string().optional(),
            contact: z.string().optional(),
            enabled: z.boolean().default(true),

            address: getAddressSchema(),
        }).transform(values => ({
            ...values,
            get shortAddress(): string {
                let address = values.address;
                return [address.street, address.postalCode].filter(n => n).join(", ");
            },
            get longAddress(): string {
                let address = values.address;
                return [address.name, address.street, address.district, address.city, address.postalCode].filter(n => n).join(", ");
            }
        })),
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

export type GroupSection = z.infer<ReturnType<typeof getGroupSectionsSchema>>
export const collections = {
    groups: groupsCollection,
    units: unitsCollection,
    events: eventsCollection,
    sections: sectionsCollection
};