export enum TransactionActivityType {
    Minted = 'Minted',
    Sale = 'Sale',
    Bid = 'Bid',
    Listing = 'Listing',
    Transfer = 'Transfer',
    Offer = 'Offer',
}

export enum TransactionStatus {
    NORMAL = 1,
    SOLD = 2,
    CANCELED = 3,
    EXPIRED = 4,
}