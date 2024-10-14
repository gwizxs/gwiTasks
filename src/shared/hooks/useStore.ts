import { StoreContext } from "main";
import { useContext } from "react";


export default function UseStore() {
  return useContext(StoreContext)
}