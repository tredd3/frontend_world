export type AccessTokenMessage = {
  accessToken: string;
  refreshToken: string;
  apiKey: string;
  expiresAt: number;
};

export type LocationMessage = {
  lat: number;
  lng: number;
};

export declare function getTokens(): Promise<AccessTokenMessage>;
export declare function getLatLng(): Promise<LocationMessage>;
export declare function closeWindow(): void;
export declare function makeCall(phoneNumber: number): void;
export declare function showHeader(): void;
export declare function hideHeader(): void;
export declare function chatWithCustomerService(): void;
export declare function startHandlingBackButton(callback: () => void): () => void;
export declare function notifyBannerClick(bannerId: number, type: number, subType: number): boolean;
