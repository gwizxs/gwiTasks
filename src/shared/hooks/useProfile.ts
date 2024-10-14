import { useQuery } from 'react-query';
import { userService } from 'shared/service/user.service';

export function useProfile() {
    const {data, isLoading, isSuccess} = useQuery({
        queryKey: ['profile'],
        queryFn: () => userService.getProfile(),
        
    })
    return {data, isLoading, isSuccess}
}