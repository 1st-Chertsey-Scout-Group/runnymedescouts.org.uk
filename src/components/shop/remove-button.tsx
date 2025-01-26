import { cn } from "basecamp/libs";
import { Trash2 } from "lucide-react";
import { useBasket } from "./state/basket.store";

type RemoveButtonProps = {
    productId: string
};

export const RemoveButton: React.FC<RemoveButtonProps> = ({ productId }) => {
    const basket = useBasket();

    const handleRemove = (e: React.FormEvent) => {
        basket.actions.removeFromBasket(productId);
    }

    return (
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
    );
};