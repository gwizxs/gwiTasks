import { useMutation } from "react-query";
import { authService } from "../../service/auth.service";
import { useNavigate } from "react-router";
import { DASHBOARD_PAGES } from "../../config/pages-url.config";
import { LogoutOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { observer } from "mobx-react-lite";

function LogoutBtn() {
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
    <Button onClick={handleLogout} type="primary" icon={<LogoutOutlined />} />
  </Tooltip>
  )
}

export default observer(LogoutBtn);
