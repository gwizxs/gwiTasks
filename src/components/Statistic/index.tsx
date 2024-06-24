
import { useProfile } from "../../hooks/useProfile";
import { observer } from "mobx-react-lite";
import './Statistic.scss';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface Statistic {
  label: string;
  value: string;
}

export function Statistics() {
  const { data, isLoading } = useProfile();

  return (
    <div style={{ display: "flex", gap: "12px" }}>

      {isLoading ? (
        <>
          {[...Array(4)].map((_, index) => ( 
            <div key={index} className="statistic-card">
            </div>
          ))}
        </>

      ) : data?.statistics.length ? (
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
