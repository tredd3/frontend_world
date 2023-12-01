import { CartPivot, ShipmentProductPivot } from '../../types';

export type OnCartUpdated = (cart?: CartPivot) => void;

export type ActionHandlers = {
  onSaveForLater: (product: ShipmentProductPivot) => Promise<void>;
  onMoveToCart: (product: ShipmentProductPivot) => Promise<void>;
  onDeleteSavedForLater: (product: ShipmentProductPivot) => Promise<void>;
  onDelete: (product: ShipmentProductPivot) => Promise<void>;
  onChangeQuantity: (product: ShipmentProductPivot, quantity: number) => Promise<void>;
}
