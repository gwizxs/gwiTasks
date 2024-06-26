import Body from "./components/Body"
import ListView from "./pages/Tasks/list/ListView"


const App = () => {
  return (
    <Body selectedKey="sub0" BreadName={'Home'}>
       <ListView/>
    </Body>
  )
}

export default App;