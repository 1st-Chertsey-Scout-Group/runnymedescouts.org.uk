import { useStore } from "@nanostores/react";
import { computed, map } from "nanostores";
import { $basket } from "./basket.store";
import { isEmailValid, isNullOrWhiteSpace } from "@/lib/utils";

export type Contact = {
    name: string | undefined;
    youngPersonName: string | undefined;
    email: string | undefined;
    groupUnitId: string | "";
    sectionId: string | "";
    additionalInformation: string | undefined,
    terms: boolean;
}

const initialValue = {
    name: undefined,
    youngPersonName: undefined,
    email: undefined,
    groupUnitId: "",
    sectionId: "",
    additionalInformation: undefined,
    terms: false
}

export const $contact = map<Contact>(initialValue)


const updateTerms = (terms: boolean) => {
    $contact.setKey("terms", terms);
}

const updateName = (name: string) => {
    $contact.setKey("name", name);
}

const updateYoungPersonName = (youngPersonName: string) => {
    $contact.setKey("youngPersonName", youngPersonName);
}

const updateEmail = (email: string) => {
    $contact.setKey("email", email);
}

const updateGroupUnitId = (groupUnitId: string) => {
    $contact.setKey("groupUnitId", groupUnitId);
    updateSectionId("");
}

const updateSectionId = (sectionId: string) => {
    $contact.setKey("sectionId", sectionId);
}

const updateAdditionalInformation = (additionalInformation: string) => {
    $contact.setKey("additionalInformation", additionalInformation);
}

const reset = () => {
    $contact.set(initialValue)
}

export const $valid = computed([$contact, $basket], (contact, basket) => {
    if (Object.keys(basket).length == 0) {
        return false;
    }

    if (isNullOrWhiteSpace(contact.name)) {
        return false;
    }

    if (isNullOrWhiteSpace(contact.email) || !isEmailValid(contact.email)) {
        return false;
    }

    if (isNullOrWhiteSpace(contact.groupUnitId)) {
        return false;
    }

    if (isNullOrWhiteSpace(contact.sectionId)) {
        return false;
    }

    if (!contact.terms) {
        return false;
    }

    return true;
})

export const useContact = () => {
    const contact = useStore($contact);
    const valid = useStore($valid);

    return {
        ...contact,
        valid,
        actions: {
            updateName,
            updateYoungPersonName,
            updateEmail,
            updateGroupUnitId,
            updateSectionId,
            updateAdditionalInformation,
            updateTerms,
            reset
        }
    }
}