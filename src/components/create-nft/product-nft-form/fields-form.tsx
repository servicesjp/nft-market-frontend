/* eslint-disable import/no-anonymous-default-export */

import { __ } from "@/helpers/common";

export default {
    formField: {

      // Step 1

      photos: {
        name: "photos",
        initialValue: [] as File[],
        label:"Image or video",
        subLabel: `${__('supported_file_types')}: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Maximum size: 100 MB, Limit: 5 photos.`,
        icon: '/nft/upload-file-icon.svg',
        supportedFileTypes: ['jpg','jpeg', 'png', 'gif', 'svg', 'mp4', 'webm', 'mp3', 'wav', 'ogg', 'glb', 'gltf'],
        maxFileSize: 100, // MB
        minPhotos: 1,
        maxPhotos: 5,
      },

      title: {
        name: "title",
        initialValue:"prueba",
        label:"Title",
        placeholder:"What are you selling?",
      },
      
      description: {
        name: "description",
        initialValue:"prueba",
        label:"Describe the experience",
        placeholder:"Describe your item",
      },

      tags: {
        name: "tags",
        initialValue: ['Sales'],
        options: [
          { value: "Sales", label: "Sales" },
          { value: "Transfers", label: "Transfers" },
        ],
        label:"Tags",
        placeholder:"Tags",
      },

      // Step 2

      category: {
        name: "category",
        initialValue: 'Sales',
        label:"Category",
        options: [
          { value: "Sales", label: "Sales" },
          { value: "Transfers", label: "Transfers" },
        ],
        placeholder:"Please select a category",
      },
      
      brand: {
        name: "brand",
        initialValue: 'Sales',
        label:"Brand",
        options: [
          { value: "Sales", label: "Sales" },
          { value: "Transfers", label: "Transfers" },
          { value: "No brand", label: "No brand" },
        ],
        placeholder:"Select brand",
      },

      condition: {
        name: "condition",
        initialValue: 'New',
        label:"Condition",
        options: [
          { value: "New", label: "New [Unused]" },
          { value: "Good", label: "Good [Functional]" },
          { value: "Fair", label: "Fair [Flaws/defects]" },
          { value: "Poor", label: "Poor [For parts]" },
        ],
      },

      color: {
        name: "color",
        initialValue: 'Red',
        label:"Color",
        options: [
          { value: "Red", label: "Red" },
          { value: "Blue", label: "Blue" },
          { value: "Black", label: "Black" },
        ],
        placeholder:"Select color",
      },


      // Step 3

      delivery: {
        name: "delivery",
        initialValue: '',
        label:"Delivery",
        options: [
          { 
            label: "Standard Shipping", 
            desc: 'Best for shipping small items in Peru. We will send you a code by email and you will ship the item. Shipping protection included.', 
            subLabel: 'Who will pay for delivery?',
            value: 'Standard Shipping',
            options: [
              {
                label: "I'll pay",
                value: "I'll pay",
              },
            ], 
          },
          { 
            label: "Ship on your own", 
            desc: 'You provide your own label and ship the item. It’s not covered by shipping protection.', 
            value: "Ship on your own", 
          },
        ],
      },

      deliveryDetail: {
        name: "deliveryDetail",
        initialValue: "I'll pay",
        placeholder:"Select",
      },


      currency: {
        name: "currency",
        initialValue: '',
        label:"Pricing",
        subLabel: 'Set price',
        options: [
          { value: "USDT", label: "USDT" },
          { value: "ETH", label: "ETH" },
          { value: "BNB", label: "BNB" },
          { value: "WETH", label: "WETH" },
        ],
        placeholder:"USDT",
      },

      pricePerPerson: {
        name: "pricePerPerson",
        initialValue:0,
        suffix: '',
      },

    },
  };
  