import { formatPrice } from "@/lib/utils";
import { useBasket } from "./state/basket.store";
import { useCatalogue } from "./state/catalogue.store";

type TotalPriceProps = {

};

export const TotalPrice: React.FC<TotalPriceProps> = ({ }) => {

    const basket = useBasket();
    const catalogue = useCatalogue();

    const products = catalogue.store.filter((product) => Object.keys(basket.store).indexOf(product.id) != -1);

    const total = products.reduce((total, product) => {
        return total + (product.price * (basket.store[product.id] ?? 0))
    }, 0);

    return (
        <>
            {formatPrice(total)}
        </>

    )
}


export const TotalPriceFallback: React.FC = () => {
    return (
        <div className="h-2.5 bg-alternative-dark rounded-full w-12 mx-auto"></div>
    )
}