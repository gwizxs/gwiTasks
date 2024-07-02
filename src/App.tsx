import Body from "./components/Body"
import StepsComponent from "./components/steps";
import ListView from "./pages/Tasks/list/ListView"


const App = () => {

  const customStepTitles = ['add a task']
  return (
    <Body selectedKey="sub0" BreadName={'Home'}>
              <StepsComponent stepTitles={customStepTitles}></StepsComponent>
       <ListView/>
    </Body>
  )
}

export default App;