import { cn } from "basecamp/libs";
import { Minus, Plus } from "lucide-react";
import { useBasket } from "./state/basket.store";

type QuantitySelectorProps = {
    productId: string
};

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({ productId }) => {
    const basket = useBasket();
    const quantity = basket.actions.quantity(productId);


    const handleDecrement = (e: React.FormEvent) => {
        basket.actions.decrementQuantity(productId);
    }

    const handleIncrement = (e: React.FormEvent) => {
        if (quantity != undefined) {
            basket.actions.incrementQuantity(productId);
        }
    }

    return (
        <div className="flex items-center grow">
            <button
                onClick={handleDecrement}
                type="button"
                className={cn(
                    "flex gap-4 items-center border justify-center text-center text-white rounded-lg focus:ring-4 focus:outline-none",
                    "bg-primary focus:ring-primary hover:border-primary hover:bg-white hover:text-primary",
                    "p-1 text-sm"
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
    )
};