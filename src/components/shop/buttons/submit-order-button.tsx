import { cn } from "basecamp/libs";
import { Truck } from "lucide-react";
import { useContact } from "../state/contact.store";

type SubmitOrderButtonProps = {

};

export const SubmitOrderButton: React.FC<SubmitOrderButtonProps> = ({ }) => {
    const contact = useContact();


    const disabled = !contact.valid;

    return (
        <button
            type="button"
            className={cn(
                "flex gap-4 items-center border justify-center text-center text-white rounded-lg w-full focus:ring-4 focus:outline-none",
                "py-3 px-5 font-medium",
                "transition-color",
                {
                    "bg-primary focus:ring-primary hover:border-primary hover:bg-white hover:text-primary": !disabled,
                    "bg-alternative-dark focus:ring-alternative-dark": disabled
                }
            )}
        >
            <span>
                Send the order
            </span>

            <Truck
                className="w-5 h-5 transition-transform duration-100"
            />
        </button>

    )
}
export const SubmitOrderButtonFallback: React.FC = () => {
    return (<button
        type="button"
        disabled={true}
        className={cn(
            "flex gap-4 items-center border justify-center text-center text-white rounded-lg w-full focus:ring-4 focus:outline-none",
            "bg-alternative-dark focus:ring-alternative-dark",
            "py-3 px-5 font-medium",
        )}
    >
        <span>
            Send the order
        </span>

        <Truck
            className="w-5 h-5 transition-transform duration-100"
        />
    </button>)
}