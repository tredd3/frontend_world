export const actions = {
  preCheckout: 0,
  postCheckout: 1
} as const;

export const headerWithStoreId = (storeId?: number | null) => (
  { headers: { StoreId: String(storeId || 0) } }
);
