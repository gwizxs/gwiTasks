import { axiosWithAuth } from "../api/interceptors";
import {IimageFile} from '../types/image.types'

class ImageFile {
  private BASE_URL = '/image';

  async uploadFile(file: File): Promise<IimageFile> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axiosWithAuth.post<IimageFile>(`${this.BASE_URL}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  async getFile(fileName: string): Promise<Blob> {
    const response = await axiosWithAuth.get(`${this.BASE_URL}/getFile`, {
      params: { fileName },
      responseType: 'blob', 
    });
    return response.data;
  }
}

export const imageFile = new ImageFile();
