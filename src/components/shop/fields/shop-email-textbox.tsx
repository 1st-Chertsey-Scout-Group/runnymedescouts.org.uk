import { Asterisk } from "lucide-react";
import { useContact } from "../state/contact.store";
import { useId, useState } from "react";
import { isEmailValid, isNullOrWhiteSpace } from "@/lib/utils";

type ShopEmailTextboxProps = {
};

export const ShopEmailTextbox: React.FC<ShopEmailTextboxProps> = () => {
    const id = useId();
    const contact = useContact();
    const [dirty, setDirty] = useState(false);

    const email = contact.email;
    const handleChange = (e: React.ChangeEvent) => {
        contact.actions.updateEmail((e.target as HTMLInputElement).value)
    }

    const handleBlur = (_: React.FocusEvent) => {
        setDirty(true);
    }

    const invalid = dirty && (isNullOrWhiteSpace(email) || !isEmailValid(email));

    return (
        <div>
            <label htmlFor={id} className="block mb-2 font-medium">
                <span className="inline-block">Your email</span>

                <span className="inline-block">
                    <span className="sr-only">required</span>
                    <Asterisk aria-hidden="true" className="text-primary w-4 h-4" />
                </span>

            </label>
            <input
                type="email"
                id={id}
                name={id}
                className="block p-2.5 w-full rounded-lg bg-input text-input-foreground border border-input-border focus:ring-1 focus:ring-primary"
                placeholder="bear@scouts.org.uk"
                required={true}
                value={email}
                onChange={(e) => handleChange(e)}
                onBlur={(e) => handleBlur(e)}
            />
            {
                invalid && <div className="text-sm pl-2.5 pt-2 text-danger">Please enter a valid email.</div>
            }
        </div>
    )
}

export const ShopEmailTextboxFallback: React.FC = () => {
    const id = useId();
    return (
        <div>
            <label htmlFor={id} className="block mb-2 font-medium">
                <span className="inline-block">Your email</span>

                <span className="inline-block">
                    <span className="sr-only">required</span>
                    <Asterisk aria-hidden="true" className="text-primary w-4 h-4" />
                </span>

            </label>
            <input
                type="email"
                id={id}
                name={id}
                className="block p-2.5 w-full rounded-lg bg-input text-input-foreground border border-input-border focus:ring-1 focus:ring-primary"
                placeholder="bear@scouts.org.uk"
                required={true}
                disabled={true}
            />
        </div>
    )
}