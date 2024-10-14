import { observer } from "mobx-react-lite";
import { TimeBlList } from "./Form/Timelist";
import { FormProvider, useForm} from "react-hook-form";
import TimeBlForm from "./Form/TimeForm";
import styles from './TimeBlocking.module.scss'
import Body from "../../components/Body";
import { TypeTimeBlockFormState } from "../../types/time-block.types";
import StepsComponent from "../../components/steps";


const TimeBlocking = observer(() => {
  const methods = useForm<TypeTimeBlockFormState>()

  const customStepTitles = ['add time-block']
  
      return (
        <FormProvider {...methods}>
        <Body  selectedKey="sub3" BreadName={'Time-block'}>
        <StepsComponent stepTitles={customStepTitles}></StepsComponent>
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