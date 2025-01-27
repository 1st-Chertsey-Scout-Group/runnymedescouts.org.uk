import { cn } from "basecamp/libs";
import { useBasket } from "../state/basket.store";
import { ShoppingBasket } from "lucide-react";
import { QuantitySelector } from "../quantity-selector";
import { RemoveButton } from "./remove-button";

type AddToCartButtonProps = {
    productId: string
};

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({ productId }) => {
    const basket = useBasket();

    const isInBasket = basket.actions.isInBasket(productId);

    const handleAdd = (_: React.FormEvent) => {
        basket.actions.addToBasket(productId);
    }

    if (isInBasket) {
        return (
            <div className="flex">
                <QuantitySelector productId={productId} />
                <RemoveButton productId={productId} />
            </div>
        )
    } else {
        return (
            <button
                onClick={handleAdd}
                type="button"
                className={cn(
                    "flex gap-4 items-center border justify-center text-center text-white rounded-lg w-full focus:ring-4 focus:outline-none",
                    "bg-primary focus:ring-primary hover:border-primary hover:bg-white hover:text-primary",
                    "py-3 px-5 font-medium",
                )}
            >
                <ShoppingBasket className="w-5 h-5 transition-transform duration-100" />
                <span>
                    Add to Cart
                </span>
            </button>
        )
    }
}


export const AddToCartButtonFallback: React.FC = () => {
    return (
        <div
            role="status"
            className="max-w-sm animate-pulse"
        >
            <div className="h-12 py-3 px-5 bg-alternative rounded-lg w-full" />
            <span className="sr-only">
                Loading...
            </span>
        </div>
    )
}
