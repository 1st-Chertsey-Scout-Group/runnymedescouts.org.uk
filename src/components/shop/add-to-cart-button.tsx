import { cn } from "basecamp/libs";
import { useBasket } from "./state/basket.store";
import { Minus, Plus, ShoppingBasket, Trash, Trash2 } from "lucide-react";

type AddToCartButtonProps = {
    productId: string
};

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({ productId }) => {
    const basket = useBasket();

    const isInBasket = basket.isInBasket(productId);
    const quantity = basket.quantity(productId);

    const handleAdd = (e: React.FormEvent) => {
        basket.addToBasket(productId);
    }

    const handleRemove = (e: React.FormEvent) => {
        basket.removeFromBasket(productId);
    }

    const handleDecrement = (e: React.FormEvent) => {
        basket.decrementQuantity(productId);
    }

    const handleIncrement = (e: React.FormEvent) => {
        basket.incrementQuantity(productId);
    }

    if (isInBasket) {
        return (
            <div className="flex">

                <div className="flex items-center grow">

                    <button
                        onClick={handleDecrement}
                        type="button"
                        className={cn(
                            "flex gap-4 items-center border justify-center text-center text-white rounded-lg focus:ring-4 focus:outline-none",
                            "bg-primary focus:ring-primary hover:border-primary hover:bg-white hover:text-primary",
                            "p-1 text-sm",
                        )}
                    >
                        <Minus className="w-5 h-5 transition-transform duration-100" />
                    </button>

                    <span className="w-10 shrink-0 text-center text-sm font-medium"
                    >
                        {quantity}
                    </span>

                    <button
                        onClick={handleIncrement}
                        type="button"
                        className={cn(
                            "flex gap-4 items-center border justify-center text-center text-white rounded-lg focus:ring-4 focus:outline-none",
                            "bg-primary focus:ring-primary hover:border-primary hover:bg-white hover:text-primary",
                            "p-1 text-sm",
                        )}
                    >
                        <Plus className="w-5 h-5 transition-transform duration-100" />
                    </button>
                </div>


                <button
                    onClick={handleRemove}
                    type="button"
                    className={cn(
                        "shrink flex gap-4 items-center border justify-center text-center text-white rounded-lg focus:ring-4 focus:outline-none",
                        "bg-danger focus:ring-danger hover:border-danger hover:bg-white hover:text-danger",
                        "py-3 px-5 font-medium",
                    )}
                >
                    <Trash2 className="w-5 h-5 transition-transform duration-100" />
                </button>
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
