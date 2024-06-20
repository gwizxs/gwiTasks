import { Controller, SubmitHandler, useFormContext } from "react-hook-form";
import type { TypeTimeBlockFormState } from "../../types/time-block.types";
import { useUpdateTimeBl } from "./useUpdateTimeBl";
import  {useCreateTimeBl}  from "./useCreateTimeBl";
import { COLORS } from "./colors.date";
import { Button,  Col,  Input, InputNumber, InputNumberProps, Row, Select, Slider } from "antd";
import {  PlusCircleOutlined } from "@ant-design/icons";
import { useState } from "react";


 function TimeBlForm() {
    const [inputValue, setInputValue] = useState(120);
    const {register, control, watch, reset, handleSubmit } =
    useFormContext<TypeTimeBlockFormState>()

    const existsId = watch('id')

    const onChange: InputNumberProps['onChange'] = (newValue) => {
        setInputValue(newValue as number);
      };
      
      const { UpdateTimeBl } = useUpdateTimeBl(existsId);
      const { CreateTimeBl, isPending } = useCreateTimeBl();

    const onSubmit: SubmitHandler<TypeTimeBlockFormState> = data => {
        const { color, id, ...rest} = data
        const dto = {...rest, color: color || undefined}

        if (id) {
            UpdateTimeBl({
                id,
                data: dto
            })
        } else {
            CreateTimeBl(dto)
           
        }
        reset({
            color: COLORS[COLORS.length - 1],
            duration: 0,
            name: '',
            id: undefined,
            order: 1
        })
    }

    return (
        <form
        style={{border: '1px solid #e6f7ff'}}
        onSubmit={handleSubmit(onSubmit)}
        
        >
            <Input
            style={{marginBottom: 10}}
            {...register('duration', {
                required: true
            })}
            type="text"
            placeholder="Enter task">
            </Input>
            <Row align="middle">
  <Col span={12} style={{ marginRight: 10 }}>
    <Slider
     style={{ marginBottom: 10 }}
     {...register('duration', {
         required: true
     })}
      min={120}
      max={360}
      onChange={onChange}
      value={typeof inputValue === 'number' ? inputValue : 0}
    />
  </Col>
  
  <Col span={4}>
        <InputNumber
          min={120}
          max={360}
          style={{ margin: '0 16px' }}
          value={inputValue}
          onChange={onChange}
        />
      </Col>
</Row>
<div>Enter time (min.)</div>



            <div style={{marginTop: 30}}>
                <span style={{marginBottom: 15, marginRight: 9}}>color:</span>
                <Controller
                control={control}
                name="color"
                render={({ field: { value, onChange}}) => (
                    <Select
                    options={COLORS.map(item => ({
                        value: item,
                        label: item
                    }))}
                    onChange={onChange}
                    value={value || COLORS[COLORS.length - 1]}
                    />
                )} />
            </div>
            <Button
            icon={<PlusCircleOutlined />}
            disabled={isPending}
            >
             {existsId ? 'Update' : 'Create'}
            </Button>
        </form>
    )
}

export default TimeBlForm;
