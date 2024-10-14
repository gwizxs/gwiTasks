import { useQuery } from 'react-query';
import { imageFile } from 'shared/service/image.service';

export function useFileQuery(fileName: string) {
  return useQuery(['image', fileName],  () => getFile(fileName), {
    enabled: !!fileName, 
  });
}

async function getFile(fileName: string) {
  const imageBlob = await imageFile.getFile(fileName);
  const imageUrl = URL.createObjectURL(imageBlob);
  return {
    imageUrl
  }
}
