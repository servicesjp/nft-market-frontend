import { __ } from "@/helpers/common";

export const serviceIncludeOptions = () => {
  return [
    {
      value: "Transport",
      label: __("transport"),
      icon: "/nft/transport-icon.svg",
    },
    { value: "Drinks", label: __("drinks"), icon: "/nft/drink-icon.svg" },
    { value: "Food", label: __("food"), icon: "/nft/food-icon.svg" },
    { value: "Wifi", label: __("wifi_on_board"), icon: "/nft/wifi-icon.svg" },
    {
      value: "Phone Ticket",
      label: __("phone_ticket"),
      icon: "/nft/phone-icon.svg",
    },
    {
      value: "Bilingual guide",
      label: __("bilingual_guide"),
      icon: "/nft/bilingual-icon.svg",
    },
  ];
};
