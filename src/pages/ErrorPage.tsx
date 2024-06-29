/* eslint-disable react-refresh/only-export-components */

import { Button, Result } from 'antd';
import { observer } from 'mobx-react-lite';

const ErrorPage = () => {
    return (
      <>
      <Result
  status="404"
  title="404"
  subTitle="Sorry, the page you visited does not exist."
  extra={<Button type="primary" href='/vite-project/Home'>Back Home</Button>}
/>
      </>
    )
}

export default observer(ErrorPage);