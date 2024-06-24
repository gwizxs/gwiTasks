import React, { useEffect, useState } from 'react';
import { Card, Input } from 'antd';
import Uploads from './Uploads';
import Btn from '../../components/UI/Btn';
import Skeleton from 'react-loading-skeleton';



const CardDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { TextArea } = Input;

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 200); 
  }, []);
  return (
    <div style={{ flex: 2 }}>
            {isLoading ? (
        <Skeleton width={400} height={350} baseColor="#d6e4ff" />
      ) : (
        <>
      <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
          <Uploads />
          <div style={{ marginLeft: 20 }}>
            <Input showCount maxLength={20} placeholder="введите новое имя" />
          </div>
        </div>
        <TextArea showCount maxLength={100} placeholder="введите новое описание" style={{ resize: 'none', width: '100%' }} />
        <div>
          <div style={{ marginTop: 40, float: 'right' }}>
            <Btn onClick={() => onclick} />
          </div>
        </div>
      </Card>
      </>
      )}
    </div>
  );
};

export default CardDetails;
