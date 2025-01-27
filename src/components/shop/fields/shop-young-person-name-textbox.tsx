import { useId, useState } from "react";
import { useContact } from "../state/contact.store";

type ShopYoungPersonNameTextboxProps = {
};

export const ShopYoungPersonNameTextbox: React.FC<ShopYoungPersonNameTextboxProps> = () => {
    const id = useId();
    const contact = useContact();
    const [dirty, setDirty] = useState(false);

    const youngPersonName = contact.youngPersonName;

    const handleChange = (e: React.ChangeEvent) => {
        useState(true);
        contact.actions.updateYoungPersonName((e.target as HTMLInputElement).value)
    }

    const handleBlur = (e: React.FocusEvent) => {
        setDirty(true);
    }

    return (
        <div>
            <label htmlFor={id} className="block mb-2 font-medium">
                <span className="inline-block">Your young person's name</span>
            </label>
            <input
                type="text"
                id={id}
                name={id}
                className="block p-2.5 w-full rounded-lg bg-input text-input-foreground border border-input-border focus:ring-1 focus:ring-primary"
                placeholder="Jesse Grylls"
                required={false}
                value={youngPersonName}
                onChange={(e) => handleChange(e)}
                onBlur={(e) => handleBlur(e)}
            />
        </div>
    )
}

export const ShopYoungPersonNameTextboxFallback: React.FC = () => {
    const id = useId();

    return (
        <div>
            <label htmlFor={id} className="block mb-2 font-medium">
                <span className="inline-block">Your young person's name</span>
            </label>
            <input
                type="text"
                id={id}
                name={id}
                className="block p-2.5 w-full rounded-lg bg-input text-input-foreground border border-input-border focus:ring-1 focus:ring-primary"
                placeholder="Jesse Grylls"
                required={false}
            />
        </div>
    )
}