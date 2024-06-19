import { Spin } from "antd";
import { useProfile } from "../../hooks/useProfile";
import { observer } from "mobx-react-lite";
import './Statistic.scss'

interface Statistic {
  label: string;
  value: string;
}

export function Statistics() {
  const { data, isLoading } = useProfile();

  return isLoading ? (
    <Spin />
  ) : (
<div style={{ display: "flex", gap: "12px" }}>
  {data?.statistics.length ? (
    data.statistics.map((statistic: Statistic) => (
      <div key={statistic.label} className="statistic-card">
        <div>
          <div style={{textAlign: "center"}}>{statistic.label}</div>
          <div style={{textAlign: "center"}}>{statistic.value}</div>
        </div>
      </div>
    ))
  ) : (
    <p>Ошибка загрузки данных!</p>
  )}
</div>



  );
}

export default observer(Statistics);
