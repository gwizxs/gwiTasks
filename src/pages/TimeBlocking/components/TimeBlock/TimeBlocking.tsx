import StepsComponent from "entities/steps/ui/Steps";
import { observer } from "mobx-react-lite";
import { FormProvider, useForm} from "react-hook-form";
import Body from "widgets/Body/ui/Body";
import TimeBlForm from "../TimeForm";
import { TimeBlList } from "../Timelist";
import cl from './TimeBlocking.module.scss'
import type { TypeTimeBlockFormState } from "shared/types/time-block.types";


const TimeBlocking = observer(() => {
  const methods = useForm<TypeTimeBlockFormState>()

  const customStepTitles = ['add time-block']
  
      return (
        <FormProvider {...methods}>
        <Body  selectedKey="sub3" BreadName={'Time-block'}>
        <StepsComponent stepTitles={customStepTitles}></StepsComponent>
        <FormProvider {...methods}>
                     <div className={cl.DivBlock}>
                         <TimeBlList/>
                         <TimeBlForm/>
                     </div>
                     </FormProvider>
        </Body>
        </FormProvider>
          
      );
    })
      
export default TimeBlocking;