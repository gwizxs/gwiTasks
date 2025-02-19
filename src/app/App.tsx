import Body from "widgets/Body/ui/Body";
import StepsComponent from "entities/steps/ui/Steps";
import ListView from "pages/Tasks/ui/ListView";


const App = () => {

  const customStepTitles = ['add a task']
  return (
    <Body selectedKey="sub0" BreadName={'Home'}>
      <StepsComponent stepTitles={customStepTitles}></StepsComponent>
      <ListView />
    </Body>
  )
}

export default App;