import type { NavigationLink } from "@/models/navigation-link";
import { SITE_URL } from "./consts";

export const HEADER_LINKS: NavigationLink[] = [
    {
        text: "Home",
        url: "/",
        target: "_self"
    },
    {
        text: "Diary",
        url: "/diary",
        target: "_self"
    },
    {
        text: "Groups and Units",
        url: "/groups-and-units",
        target: "_self"
    },
    {
        text: "Contact",
        url: "/contact",
        target: "_self"
    },
]

export const FOOTER_LINKS: NavigationLink[] = [
    {
        text: "Accounts and annual returns",
        url: "https://register-of-charities.charitycommission.gov.uk/en/charity-search/-/charity-details/1039314/accounts-and-annual-returns",
        target: "_blank"
    },
    {
        text: "Surrey Scouts",
        url: "http://www.surrey-scouts.org.uk/",
        target: "_blank"
    },
    {
        text: "The Scout Association",
        url: "http://www.scouts.org.uk/",
        target: "_blank"
    },
    {
        text: "Facebook",
        url: "https://www.facebook.com/runnymededistrictscouts/",
        target: "_blank"
    },
    {
        text: "Contact",
        url: "/contact",
        target: "_self"
    },
]