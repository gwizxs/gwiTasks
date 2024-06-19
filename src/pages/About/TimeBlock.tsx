import { useForm } from "react-hook-form";
import { TypeTimeBlockFormState } from "../../types/time-block.types";
import TimeBlForm from "./TimeBlForm";



export function Timeblock() {
     const methods = useForm<TypeTimeBlockFormState>()

     return (
        <div>
            <TimeBlForm/>
        </div>
     )
}