import { ShoppingBasket } from "lucide-react";
import { useBasket } from "./state/basket.store";

type ViewCartButtonProps = {

};

export const ViewCartButton: React.FC<ViewCartButtonProps> = ({ }) => {
    const basket = useBasket();

    const totalQuantity = basket.totalQuantity();

    return (
        <div className="relative inline-block">
            <ShoppingBasket className="h-8 w-8" />

            {totalQuantity > 0 && (
                <div className="absolute -top-3 -right-2 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalQuantity}
                </div>
            )}


        </div>
    )
}

export const ViewCartButtonFallback: React.FC = () => {
    return (
        <div className="relative inline-block">
            <ShoppingBasket className="h-8 w-8" />
        </div>
    )
}