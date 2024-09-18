
import { z, defineCollection } from 'astro:content';

const therapeutesCollection = defineCollection({
    type: "content", schema: z.object({
        title: z.string(),
        name: z.string(),
        subtitle: z.string(),
        description: z.string(),
        imageBackground: z.string().optional(),
        imagePortrait: z.string().optional(),
        phone: z.string().optional(),
        mail: z.string().optional(),
        website: z.string().optional(),
        order: z.number(),
        color: z.string()
    }),
});

export const collections = {
    'therapeutes': therapeutesCollection,
};