export enum ProductSortType {
  RecentlyListed,
  RecentlyCreated,
  RecentlySold,
  RecentlyReceived,
  EndingSoon,
  PriceLowToHigh,
  PriceHighToLow,
  HighestLastSale,
  MostViewed,
  MostFavorited,
  Oldest,
}

export const ProductSortTypeArrayOptions = [
  { value: ProductSortType.RecentlyListed, label: "recently_listed" },
  { value: ProductSortType.RecentlyCreated, label: "recently_created" },
  // {value: ProductSortType.RecentlySold, label: 'Recently Sold'},
  { value: ProductSortType.RecentlyReceived, label: "recently_received" },
  // { value: ProductSortType.EndingSoon, label: "ending_soon" },
  {
    value: ProductSortType.PriceLowToHigh,
    label: "price_low_to_high",
  },
  {
    value: ProductSortType.PriceHighToLow,
    label: "price_high_to_low",
  },
  // {value: ProductSortType.HighestLastSale, label: 'Highest Last Sale'},
  // { value: ProductSortType.MostViewed, label: "most_viewed" },
  // {value: ProductSortType.MostFavorited, label: 'Most Favorited'},
  { value: ProductSortType.Oldest, label: "oldest" },
];
