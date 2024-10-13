
import { useProfile } from "../../hooks/useProfile";
import { observer } from "mobx-react-lite";
import './Statistic.scss';
import 'react-loading-skeleton/dist/skeleton.css';
import cl from './Statistic.module.scss'

interface Statistic {
  label: string;
  value: string;
}

const Statistics = observer(() => {
  const { data, isLoading } = useProfile();

  return (
    <div className={cl.root}>

      {isLoading ? (
        <>
          {[...Array(4)].map((_, index) => ( 
            <div key={index} className="statistic-card">
            </div>
          ))}
        </>

      ) : data?.statistics.length ? (
        data.statistics.map((statistic: Statistic) => (
          <div key={statistic.label} className={cl.statisticCard}>
            <div>
              <div className={cl.statisticDetails}>{statistic.label}</div>
              <div className={cl.statisticDetails}>{statistic.value}</div>
            </div>
          </div>
        ))
      ) : (
        <p>Ошибка загрузки данных!</p>
      )}
    </div>
  );
})

export default Statistics;
