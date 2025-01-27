import { useId, useState } from "react";
import { useContact } from "../state/contact.store";

type ShopAdditionalInformationTextAreaProps = {
};

export const ShopAdditionalInformationTextArea: React.FC<ShopAdditionalInformationTextAreaProps> = () => {
  const id = useId();
  const contact = useContact();
  const [_, setDirty] = useState(false);

  const additionalInformation = contact.additionalInformation;
  const handleChange = (e: React.ChangeEvent) => {
    contact.actions.updateAdditionalInformation((e.target as HTMLInputElement).value)
  }

  const handleBlur = (_: React.FocusEvent) => {
    setDirty(true);
  }

  return (
    <div>
      <label htmlFor={id} className="block mb-2 font-medium">
        <span className="inline-block">Additional information</span>
      </label>
      <textarea
        id={id}
        rows={6}
        name={id}
        className="block p-2.5 w-full rounded-lg bg-input text-input-foreground border border-input-border focus:ring-1 focus:ring-primary"
        placeholder="Please include any specific details or requirements related to your request (e.g. size preferences)"
        required={false}
        value={additionalInformation}
        onChange={(e) => handleChange(e)}
        onBlur={(e) => handleBlur(e)}
      ></textarea>
    </div>
  )
}

export const ShopAdditionalInformationTextAreaFallback: React.FC = () => {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="block mb-2 font-medium">
        <span className="inline-block">Additional information</span>
      </label>
      <textarea
        id={id}
        rows={6}
        name={id}
        className="block p-2.5 w-full rounded-lg bg-input text-input-foreground border border-input-border focus:ring-1 focus:ring-primary"
        placeholder="Please include any specific details or requirements related to your request (e.g. size preferences)"
        required={false}
        disabled={true}
      ></textarea>
    </div>
  )
}