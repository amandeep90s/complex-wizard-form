import { useQuery } from '@tanstack/react-query';
import { getRelationships } from '../utils/api';

const useRelationships = () => {
  return useQuery({
    queryKey: ['relationships'],
    queryFn: getRelationships
  });
};

export { useRelationships };
