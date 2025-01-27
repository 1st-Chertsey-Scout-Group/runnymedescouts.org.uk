import type { OptionGroup, Option } from "basecamp/models";
import { Asterisk } from "lucide-react";
import { useContact } from "../state/contact.store";
import { useId, useState } from "react";
import { isNullOrWhiteSpace } from "@/lib/utils";

export type GroupUnit = {
    type: "group" | "unit";
    id: string;
    name: string;
    sections: Section[];
}

export type Section = {
    id: string;
    name: string;
}

type ShopGroupUnitSelectProps = {
    groupsAndUnits: GroupUnit[]
};

export const ShopGroupUnitSelect: React.FC<ShopGroupUnitSelectProps> = ({ groupsAndUnits }) => {
    const id = useId();
    const contact = useContact();
    const [dirty, setDirty] = useState(false);

    const options: OptionGroup[] = [
        {
            type: "group",
            label: "Groups",
            options: groupsAndUnits.filter((x) => x.type == "group").map((g) => {
                return {
                    id: g.id,
                    label: g.name,
                    type: "option"
                }
            })
        },
        {
            type: "group",
            label: "Units",
            options: groupsAndUnits.filter((x) => x.type == "unit").map((g) => {
                return {
                    id: g.id,
                    label: g.name,
                    type: "option"
                }
            })
        }
    ]

    const groupUnitId = contact.groupUnitId;
    const handleChange = (e: React.ChangeEvent) => {
        contact.actions.updateGroupUnitId((e.target as HTMLSelectElement).value)
    }

    const handleBlur = (_: React.FocusEvent) => {
        setDirty(true);
    }

    const invalid = isNullOrWhiteSpace(groupUnitId) && dirty;


    return (
        <div>
            <label htmlFor={id} className="block mb-2 font-medium">
                <span className="inline-block">
                    Your group/unit
                </span>

                <span className="inline-block">
                    <span className="sr-only">required</span>
                    <Asterisk aria-hidden="true" className="text-primary w-4 h-4" />
                </span>

            </label>
            <select
                id={id}
                name={id}
                className="block p-2.5 w-full rounded-lg bg-input text-input-foreground border border-input-border focus:ring-1 focus:ring-primary"
                required={true}
                value={groupUnitId}
                onChange={(e) => handleChange(e)}
                onBlur={(e) => handleBlur(e)}
            >
                <option value="" disabled>Please select a group or unit</option>
                {
                    options &&
                    options.map((option, i) => (
                        <SelectOption key={i} option={option} />
                    ))
                }
            </select>
            {
                invalid && <div className="text-sm pl-2.5 pt-2 text-danger">Please select your group / unit.</div>
            }
        </div>
    )
}

export const ShopGroupUnitSelectFallback: React.FC = () => {
    const id = useId();
    return (
        <div>
            <label htmlFor={id} className="block mb-2 font-medium">
                <span className="inline-block">
                    Your group/unit
                </span>

                <span className="inline-block">
                    <span className="sr-only">required</span>
                    <Asterisk aria-hidden="true" className="text-primary w-4 h-4" />
                </span>

            </label>
            <select
                id={id}
                name={id}
                className="block p-2.5 w-full rounded-lg bg-input text-input-foreground border border-input-border focus:ring-1 focus:ring-primary"
                required={true}
                defaultValue=""
                disabled={true}
            >
                <option value="" disabled>Please select a group or unit</option>
            </select>
        </div>
    )
}

type ShopSectionSelectProps = {
    groupsAndUnits: GroupUnit[]
};

export const ShopSectionSelect: React.FC<ShopSectionSelectProps> = ({ groupsAndUnits }) => {
    const id = useId();
    const contact = useContact();
    const [dirty, setDirty] = useState(false);

    const sectionId = contact.sectionId;
    const groupUnitId = contact.groupUnitId;
    const handleChange = (e: React.ChangeEvent) => {
        contact.actions.updateSectionId((e.target as HTMLSelectElement).value)
    }

    const handleBlur = (_: React.FocusEvent) => {
        setDirty(true);
    }

    const invalid = isNullOrWhiteSpace(sectionId) && dirty;

    const options: Option[] = groupsAndUnits.filter((x) => x.id == groupUnitId).flatMap((x) => {
        return x.sections.map((s) => {
            return {
                type: "option",
                id: s.id,
                label: s.name
            }
        })

    });

    return (
        <div>
            <label htmlFor={id} className="block mb-2 font-medium">
                <span className="inline-block">
                    Your section
                </span>

                <span className="inline-block">
                    <span className="sr-only">required</span>
                    <Asterisk aria-hidden="true" className="text-primary w-4 h-4" />
                </span>

            </label>
            <select
                id={id}
                name={id}
                className="block p-2.5 w-full rounded-lg bg-input text-input-foreground border border-input-border focus:ring-1 focus:ring-primary"
                required={true}
                value={sectionId}
                onChange={(e) => handleChange(e)}
                onBlur={(e) => handleBlur(e)}
            >
                <option value="" disabled>Please select a section</option>
                {
                    options &&
                    options.map((option, i) => (
                        <SelectOption key={i} option={option} />
                    ))
                }
            </select>
            {
                invalid && <div className="text-sm pl-2.5 pt-2 text-danger">Please select your section.</div>
            }
        </div>
    )
}

export const ShopSectionSelectFallback: React.FC = () => {
    const id = useId();
    return (
        <div>
            <label htmlFor={id} className="block mb-2 font-medium">
                <span className="inline-block">
                    Your section
                </span>

                <span className="inline-block">
                    <span className="sr-only">required</span>
                    <Asterisk aria-hidden="true" className="text-primary w-4 h-4" />
                </span>

            </label>
            <select
                id={id}
                name={id}
                className="block p-2.5 w-full rounded-lg bg-input text-input-foreground border border-input-border focus:ring-1 focus:ring-primary"
                required={true}
                defaultValue=""
                disabled={true}
            >
                <option value="" disabled>Please select a section</option>
            </select>
        </div>
    )
}




type SelectOptionProps = {
    option: Option | OptionGroup;
};

export const SelectOption: React.FC<SelectOptionProps> = ({ option }) => {

    return (
        <>
            {
                option.type == "group" && (
                    <optgroup label={option.label}>
                        {option.options.map((childOption) => (
                            <SelectOption key={childOption.id} option={childOption} />
                        ))}
                    </optgroup>
                )
            }

            {option.type == "option" && <option value={option.id}>{option.label}</option>}
        </>

    )
}