
import { useQuery } from 'react-query';
import UserService from '../service/user.service';

export function useProfile() {
    const {data, isLoading} = useQuery({
        queryKey: ['profile'],
        queryFn: () => UserService.getProfile(UserService)
    })
    return {data, isLoading}
}