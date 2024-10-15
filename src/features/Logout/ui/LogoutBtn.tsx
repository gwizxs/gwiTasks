import { useMutation } from "react-query";
import { authService } from "shared/service/auth.service";
import { useNavigate } from "react-router-dom";
import { DASHBOARD_PAGES } from "app/config/pages-url.config";
import { RxExit } from "react-icons/rx";
import { Button, Tooltip } from "antd";
import { observer } from "mobx-react-lite";

const LogoutBtn = observer(() => {
  const navigate = useNavigate();
  
  const { mutate } = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => authService.logout(),
    onSuccess: () => navigate(DASHBOARD_PAGES.AUTH),
  });

  const handleLogout = () => {
    mutate();
  };

  return (
  <Tooltip>
    <Button onClick={handleLogout} type="dashed" ghost icon={<RxExit />} ></Button>
  </Tooltip>
  )
})

export default LogoutBtn;
