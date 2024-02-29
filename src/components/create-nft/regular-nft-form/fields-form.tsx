/* eslint-disable import/no-anonymous-default-export */

import { DEFAULT_CHAIN, currencyOptionsByChain } from "@/constants/env";
import { __ } from "@/helpers/common";

export const useFormFields = () => {
  return {
    formField: {
      // General Info
      fileNFT: {
        name: "fileNFT",
        initialValue: [] as File[],
        // label: __("image_video_audio_or_3d_model"),
        subLabel:
          `${__('supported_file_types')}: JPG, JPEG, PNG, SVG. Maximum size: 10 MB, Limit: 1 photos.`,
        icon: "/nft/upload-file-icon.svg",
        placeholder: __("enter_text"),
        supportedFileTypes: [
          "jpg",
          "jpeg",
          "png",
          "svg",
        ],
        maxFileSize: 10, // MB
        maxPhotos: 1,
      },

      nftName: {
        name: "nftName",
        initialValue: "",
        label: __("name_of_the_item"),
        placeholder: __("enter_text"),
      },

      tags: {
        name: "tags",
        initialValue: [],
        label: __("tags"),
        placeholder: __("tags"),
      },

      description: {
        name: "description",
        initialValue: "",
        label: __("description"),
        subLabel: __(
          "description_included_on_item_below_image_markdown_supported"
        ),
        placeholder: __("enter_text"),
      },

      // Detail Info

      externalLink: {
        name: "externalLink",
        initialValue: "",
        label: __("external_link"),
        subLabel: __("meteor_will_include_link_on_the_details_of_article"),
        placeholder: "https://yoursite.io/item/123",
      },

      // collection: {
      //   name: "collection",
      //   initialValue: '',
      //   label:"Collection",
      //   subLabel: 'This is the collection where your article will appear',
      //   placeholder:"Select collection",
      // },

      // properties: {
      //   name: "properties",
      //   initialValue: [],
      //   label:"Properties",
      //   subLabel: 'Textual attributes appearing as rectangles',
      //   icon: '/nft/list-icon.svg',
      // },

      // levels: {
      //   name: "levels",
      //   initialValue: [],
      //   label:"Levels",
      //   subLabel: 'Numerical attributes appearing as progress bar',
      //   icon: '/nft/star-icon.svg',
      // },

      // statistics: {
      //   name: "statistics",
      //   initialValue: [],
      //   label:"Statistics",
      //   subLabel: 'Numerical attributes that are only displayed as numbers',
      //   icon: '/nft/stats-icon.svg',
      // },

      // unlockableContent: {
      //   name: "unlockableContent",
      //   initialValue: '',
      //   label:"Unlockable Content",
      //   subLabel: 'Includes unlockable content that can only be revealed by the owner of the item.',
      //   icon: '/nft/lock-icon.svg',
      // },

      supply: {
        name: "supply",
        initialValue: 1,
        label: __("supply"),
        subLabel: __("number_of_items_that_can_be_minted"),
        placeholder: "1",
      },

      blockchain: {
        name: "blockchain",
        initialValue: "",
        placeholder: __('blockchain_label'),
        label: __("blockchain_label"),
      },

      currency: {
        name: "currency",
        label: __("price"),
        placeholder: "USDT",
        initialValue: "",
        options: currencyOptionsByChain(DEFAULT_CHAIN),
      },
      royalty: {
        name: "royalty",
        label:"Royalty for your arts",
        subLabel:"only if you want to get royalties for your art",
        placeholder:"0",
        initialValue: 0,
      },
      price: {
        name: "price",
        initialValue: "",
        suffix: "",
      },
    },
  };
};
  