import { useId, useState } from "react";
import { useContact } from "../state/contact.store";
import { isNullOrWhiteSpace } from "@/lib/utils";

type ShopTermsCheckboxProps = {
};

export const ShopTermsCheckbox: React.FC<ShopTermsCheckboxProps> = () => {
    const id = useId();
    const contact = useContact();
    const [dirty, setDirty] = useState(false);

    const terms = contact.terms;
    const handleChange = (e: React.ChangeEvent) => {
        setDirty(true);
        contact.actions.updateTerms((e.target as HTMLInputElement).checked)
    }

    const handleBlur = (e: React.FocusEvent) => {
        setDirty(true);
    }

    const invalid = !terms && dirty;

    return (
        <div className=" px-4">
            <div className="flex items-start sm:items-center">
                <input id={id} type="checkbox" checked={terms} onChange={(e) => handleChange(e)}
                    onBlur={(e) => handleBlur(e)} required={true} className="h-4 w-4 rounded border-alternative-dark text-primary focus:ring-2 focus:ring-primary" />
                <label htmlFor={id} className="ms-2 text-sm font-medium"> I understand that by submitting this form, my request and contact information will be sent via email to my group and the district uniform team. </label>
            </div>
            {
                invalid && <div className="text-sm pl-6 text-danger">You must acknowledge the above message.</div>
            }
        </div>


    );
}


export const ShopTermsCheckboxFallback: React.FC = () => {
    const id = useId();
    return (
        <div className="flex items-start sm:items-center px-4">
            <input id={id} type="checkbox" required={true} disabled={true} className="h-4 w-4 rounded border-alternative-dark text-primary focus:ring-2 focus:ring-primary" />
            <label htmlFor={id} className="ms-2 text-sm font-medium"> I understand that by submitting this form, my request and contact information will be sent via email to my group and the district uniform team. </label>
        </div>
    );
}
