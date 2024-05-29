import { useContext } from "react";

import { StoreContext } from "../main";

export default function UseStore() {
  return useContext(StoreContext)
}