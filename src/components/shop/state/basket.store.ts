import { useStore } from '@nanostores/react'
import { persistentMap } from "@nanostores/persistent";

export type Basket = {
    [productId: string]: number | undefined;
}

export const $basket = persistentMap<Basket>("uniform-basket:", {}, {
    encode: JSON.stringify,
    decode: JSON.parse,
})

const isInBasket = (productId: string): boolean => {
    let basket = $basket.get();
    return !!basket[productId];
}

const quantity = (productId: string) => {
    if (isInBasket(productId)) {
        let basket = $basket.get();
        return basket[productId];
    }
    return 0;
}

const addToBasket = (productId: string) => {
    if (!isInBasket(productId)) {
        $basket.setKey(productId, 1);
    }
}

const removeFromBasket = (productId: string) => {
    if (isInBasket(productId)) {
        $basket.setKey(productId, undefined);
    }
}

const decrementQuantity = (productId: string) => {
    if (isInBasket(productId)) {
        var q = quantity(productId);

        if (q == undefined || q <= 1) {
            removeFromBasket(productId);
            return;
        }

        $basket.setKey(productId, q - 1);
    }
}

const incrementQuantity = (productId: string) => {
    if (isInBasket(productId)) {
        var q = quantity(productId);

        if (q == undefined) {
            removeFromBasket(productId);
            return;
        }

        $basket.setKey(productId, q + 1);
    }
}

const totalQuantity = () => {
    var basket = $basket.get();

    return Object.values(basket).reduce((total, quantity) => {
        total = total ?? 0;
        return total + (quantity ?? 0);
    }, 0) ?? 0;
}

export const useBasket = () => {
    const store = useStore($basket);

    return {
        store,
        actions: {
            isInBasket,
            quantity,
            addToBasket,
            removeFromBasket,
            decrementQuantity,
            incrementQuantity,
            totalQuantity
        }
    }
}