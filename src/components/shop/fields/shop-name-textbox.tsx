import { Asterisk } from "lucide-react";
import { useContact } from "../state/contact.store";
import { useId, useState } from "react";
import { isNullOrWhiteSpace } from "@/lib/utils";

type ShopNameTextboxProps = {
};

export const ShopNameTextbox: React.FC<ShopNameTextboxProps> = () => {
    const id = useId();
    const [dirty, setDirty] = useState(false);

    const contact = useContact();

    const name = contact.name;
    const handleChange = (e: React.ChangeEvent) => {
        contact.actions.updateName((e.target as HTMLInputElement).value)
    }

    const handleBlur = (_: React.FocusEvent) => {
        setDirty(true);
    }

    const invalid = isNullOrWhiteSpace(name) && dirty;

    return (
        <div>
            <label htmlFor={id} className="block mb-2 font-medium">
                <span className="inline-block">Your name</span>

                <span className="inline-block">
                    <span className="sr-only">required</span>
                    <Asterisk aria-hidden="true" className="text-primary w-4 h-4" />
                </span>

            </label>
            <input
                type="text"
                id={id}
                name={id}
                className="block p-2.5 w-full rounded-lg bg-input text-input-foreground border border-input-border focus:ring-1 focus:ring-primary"
                placeholder="Bear Grylls"
                required={true}
                value={name}
                onChange={(e) => handleChange(e)}
                onBlur={(e) => handleBlur(e)}
            />
            {
                invalid && <div className="text-sm pl-2.5 pt-2 text-danger">Please enter your name.</div>
            }
        </div>
    )
}

export const ShopNameTextboxFallback: React.FC = () => {
    const id = useId();
    return (
        <div>
            <label htmlFor={id} className="block mb-2 font-medium">
                <span className="inline-block">Your name</span>

                <span className="inline-block">
                    <span className="sr-only">required</span>
                    <Asterisk aria-hidden="true" className="text-primary w-4 h-4" />
                </span>

            </label>
            <input
                type="text"
                id={id}
                name={id}
                className="block p-2.5 w-full rounded-lg bg-input text-input-foreground border border-input-border focus:ring-1 focus:ring-primary"
                placeholder="Bear Grylls"
                required={true}
                disabled={true}
            />
        </div>
    )
}