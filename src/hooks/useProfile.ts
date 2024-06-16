import { useQuery } from 'react-query';
import userService from '../service/user.service';

export function useProfile() {
    const {data, isLoading} = useQuery({
        queryKey: ['profile'],
        queryFn: () => userService.getProfile()
    })
    return {data, isLoading}
}