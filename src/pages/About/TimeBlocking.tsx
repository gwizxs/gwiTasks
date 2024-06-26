import { observer } from "mobx-react-lite";
import { TimeBlList } from "./Form/Timelist";
import { FormProvider, useForm} from "react-hook-form";
import TimeBlForm from "./Form/TimeForm";
import styles from './TimeBlocking.module.scss'
import Body from "../../components/Body";
import { TypeTimeBlockFormState } from "../../types/time-block.types";



const TimeBlocking = observer(() => {
  const methods = useForm<TypeTimeBlockFormState>()
  
      return (
        <FormProvider {...methods}>
        <Body  selectedKey="sub3" BreadName={'Time-block'}>
        <FormProvider {...methods}>
                     <div className={styles.DivBlock}>
                         <TimeBlList/>
                         <TimeBlForm/>
                     </div>
                     </FormProvider>
        </Body>
        </FormProvider>
          
      );
    })
      
export default TimeBlocking;