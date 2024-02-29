export enum ApprovalStatus {
    HIDDEN = 'hidden',
    WAITING = 'waiting', // waiting for approval
    APPROVED = 'approved', // approved to display on the marketplace
    DENIED = 'denied', // denied approval to display on the marketplace
    READY = 'ready', // able to apply for approval
}
