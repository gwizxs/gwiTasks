import { Controller, SubmitHandler, useFormContext } from "react-hook-form";
import { TypeTimeBlockFormState } from "../../types/time-block.types";
import useUpdateTimeBl from './useUpdateTimeBl'
import { useCreateTimeBl } from "./useCreateTimeBl";
import { COLORS } from "./colors.date";
import { Button, Form, Input, Select } from "antd";


 function TimeBlForm() {
    const {register, control, watch, reset, handleSubmit, getValues } =
    useFormContext<TypeTimeBlockFormState>()

    const existsId = watch('id')

    const { updateTimeBlock } = useUpdateTimeBl(existsId)
    const {createTimeBlock, isPending } = useCreateTimeBl()

    const onSubmit: SubmitHandler<TypeTimeBlockFormState> = data => {
        const { color, id, ...rest} = data
        const dto = {...rest, color: color || undefined}

        if (id) {
            updateTimeBlock({
                id,
                data: dto
            })
        } else {
            createTimeBlock(dto)
        }

        reset({
            color: COLORS[COLORS.length - 1],
            duration: 0,
            name: ''.
            id: undefined,
            order: 1
        })
    }

    return (
        <Form
        onSubmit={handleSubmit(onSubmit)}
        
        >
            <Input
            {...register('name', {
                required: true
            })}
            type="2"
            placeholder="Password">
            </Input>

            <Input
            {...register('name', {
                required: true
            })}
            type="password"
            placeholder="Password">
            </Input>

            <div>
                <span>color</span>
                    <Select
                    data={COLORS.map(item => ({
                        value: item,
                        label: item
                    }))}
                    onChange={onChange}
                    value={value || COLORS[COLORS.length - 1]}
                    isColorSelect
                    />
            </div>
            <Button
            disabled={isPending}
            >
             {existsId ? 'Update' : 'Create'}
            </Button>
        </Form>
    )
}

export default TimeBlForm;