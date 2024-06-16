/* eslint-disable react-refresh/only-export-components */
import { Spin } from "antd";
import { useProfile } from "../hooks/useProfile";
import { observer } from "mobx-react-lite";

interface Statistic {
    label: string;
    value: string;
  }
  

export function Statistics() {
    const { data, isLoading } = useProfile();

    return isLoading ? <Spin /> : (
        <div>
            { data?.statistics.length ? (
                data.statistics.map((statistic: Statistic) => (
                    <div key={statistic.label}>
                        <div>{statistic.label}</div>
                        <div>{statistic.value}</div>
                    </div>
                ))
            ) : <p>Ошибка загрузки данных!</p>}
        </div>
    );
}

export default observer(Statistics);
