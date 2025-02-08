import { useBasket } from "./state/basket.store";
import { useCatalogue } from "./state/catalogue.store";
import { QuantitySelector } from "./quantity-selector";
import { formatPrice } from "@/lib/utils";
import { Clock, Package } from "lucide-react";

type SummaryItemsProps = {
};

export const SummaryItems: React.FC<SummaryItemsProps> = ({ }) => {
    const basket = useBasket();

    if (Object.keys(basket.store).length == 0) {
        return (
            <table
                className="w-full text-left font-medium md:table-fixed"
            >
                <tbody className="divide-y divide-alternative-dark">
                    <tr>
                        <td
                            className="whitespace-nowrap py-4"
                        >
                            <div
                                className="flex items-center gap-4 justify-center"
                            >
                                <span className="text-danger font-bold">
                                    Your basket is empty. <a href="/shop">Return to the shop</a> to add items.
                                </span>
                            </div>
                        </td>
                    </tr>

                </tbody>
            </table>
        )
    }



    return (
        <table
            className="w-full text-left font-medium md:table-fixed"
        >
            <tbody className="divide-y divide-alternative-dark">
                {basket && Object.keys(basket.store).map((id) => (
                    <SummaryItem productId={id} key={id} />
                ))}

            </tbody>
        </table>
    )
}

export const SummaryItemsFallback: React.FC = ({ }) => {

    return (
        <table
            className="w-full text-left font-medium md:table-fixed"
        >
            <tbody className="divide-y divide-alternative-dark">
                <tr>
                    <td
                        className="whitespace-nowrap py-4 md:w-[384px]"
                    >
                        <div
                            className="flex items-center gap-4"
                        >
                            <a
                                href="#"
                                className="flex items-center aspect-square w-10 h-10 shrink-0"
                            >
                                <div className="flex items-center justify-center w-full bg-alternative-dark rounded-sm sm:w-96">
                                    <svg className="w-10 h-10 text-alternative-dark " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                                    </svg>
                                </div>
                            </a>
                            <a
                                href="#"
                                className="h-2.5 bg-alternative-dark rounded-full w-full"
                            >

                            </a>
                        </div>
                    </td>

                    <td className="p-4 text-base font-normal">
                        <div className="h-2.5 bg-alternative-dark rounded-full w-12 mx-auto"></div>
                    </td>

                    <td
                        className="p-4 text-right text-base font-bold"
                    ><div className="h-2.5 bg-alternative-dark rounded-full w-full"></div></td>
                </tr>

            </tbody>
        </table>
    )
}


type SummaryItemProps = {
    productId: string;
};

export const SummaryItem: React.FC<SummaryItemProps> = ({ productId }) => {
    const basket = useBasket();
    const catalogue = useCatalogue();

    const product = catalogue.actions.getProduct(productId);

    if (product == undefined || basket.store[productId] == undefined) {
        basket.actions.removeFromBasket(productId);
        return (<></>);
    }

    const name = product.name;
    const image = product.image.src;
    const price = formatPrice(basket.store[productId] * product.price);
    const stocked = product.stocked;

    return (
        <tr>
            <td
                className="whitespace-nowrap py-4 md:w-[384px]"
            >
                <div
                    className="flex items-center gap-4"
                >
                    <a
                        href="#"
                        className="flex items-center aspect-square w-10 h-10 shrink-0"
                    >
                        <img
                            className="h-auto w-full max-h-full"
                            src={image}
                            alt={name + " image"}
                        />
                    </a>
                    <div className="flex flex-col">
                        <a
                            href="#"
                            className="hover:underline"
                        >
                            {name}
                        </a>
                        {stocked && (
                            <div className="flex items-center gap-1">
                                <Package
                                    className={
                                        "w-5 h-5"
                                    }
                                />
                                <p className="text-sm font-medium">
                                    Stocked Item
                                </p>
                            </div>
                        )}

                        {!stocked && (
                            <div className="flex items-center gap-1">
                                <Clock
                                    className={
                                        "w-5 h-5"
                                    }
                                />
                                <p className="text-sm font-medium">
                                    To-Order Item
                                </p>
                            </div>
                        )}
                    </div>

                </div>
            </td>

            <td className="p-4 text-base font-normal">
                <div className="hidden sm:block">
                    <QuantitySelector productId={productId} />
                </div>

            </td>

            <td
                className="p-4 text-right text-base"
            > {price} </td>
        </tr>
    )
}