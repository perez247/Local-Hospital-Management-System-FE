import { Base, Company } from "./app-user";

  export class InventoryFilter {

    name?: string;
    appInventoryType?: string[];
    quantity?: number;
    inventoryId?: string;
  }

  export class InventoryItemFilter {
    companyId?: string;
    appInventoryId?: string;
    amount?: number;
    getDefault?: boolean;
    companyName?: string;
    appInventoryName?: string;
  }

  export class AppInventory {
    base?: Base
    name?: string
    quantity?: number
    appInventoryType?: string
    notifyWhenLow?: boolean
    howLow?: number
    profile?: string
    id?: string
  }

  export class AppInventoryItem {
    base?: Base
    company?: Company
    inventory?: AppInventory
    pricePerItem?: number
  }
