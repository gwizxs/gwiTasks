
import { useProfile } from "shared/hooks/useProfile";
import { observer } from "mobx-react-lite";
import 'react-loading-skeleton/dist/skeleton.css';
import cl from './Statistic.module.scss'
import { Bounce, toast } from "react-toastify";

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
        toast.warning('Сессия истекла. Пожалуйста, авторизуйтесь снова.', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Bounce
        }
        )
      )}
    </div>
  );
})

export default Statistics;
