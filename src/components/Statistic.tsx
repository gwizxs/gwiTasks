
import { Spin } from "antd";
import { useProfile } from "../hooks/useProfile";
import { observer } from "mobx-react-lite";

export function Statistics() {
    const { data, isLoading } = useProfile();

    return isLoading ? <Spin /> : (
        <div>
            {data && data.statistics && data.statistics.length ? (
                data.statistics.map(statistic => (
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
