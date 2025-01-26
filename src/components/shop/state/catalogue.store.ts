import { persistentAtom } from "@nanostores/persistent";
import { useStore } from "@nanostores/react";

export type Product = {
    id: string;
    name: string;
    price: number,
    stocked: boolean,
    image: {
        src: string;
        width: number;
        height: number;
        format: "png" | "jpg" | "jpeg" | "tiff" | "webp" | "gif" | "svg" | "avif";
    },

}

export const $catalogue = persistentAtom<Product[]>("catalogue", [], {
    encode: JSON.stringify,
    decode: JSON.parse,
})

const hasProducts = (): boolean => {
    var catalogue = $catalogue.get();

    return catalogue.length > 0;
}

const addProducts = (products: Product[]) => {
    if (!hasProducts()) {
        $catalogue.set(products);
    }
}

const getProduct = (productId: string) => {
    var catalogue = $catalogue.get();
    return catalogue.find((p) => p.id == productId);
}

export const useCatalogue = () => {
    const store = useStore($catalogue);

    return {
        store,
        actions: {
            addProducts,
            hasProducts,
            getProduct
        }
    }
}