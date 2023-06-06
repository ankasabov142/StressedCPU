export const ORDER_STATUS = {
    AWAITING_CONFIRMATION: { code: 0, name: 'Awaiting confirmation' },
    CONFIRMED: { code: 1, name: 'Confirmed' },
    SENT: { code: 2, name: 'Sent' },
    FULFILLED: { code: 3, name: 'Fulfilled' },
    CANCELLED: { code: 4, name: 'Cancelled' },
    RETURNED: { code: 5, name: 'Returned' }
}

export const ORDER_ACTION = {
    [ORDER_STATUS.CONFIRMED.code]: 'Confirm order',
    [ORDER_STATUS.SENT.code]: 'Send order',
    [ORDER_STATUS.FULFILLED.code]: 'Fulfill order',
    [ORDER_STATUS.CANCELLED.code]: 'Cancel order',
    [ORDER_STATUS.RETURNED.code]: 'Return order'
}