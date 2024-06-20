import {UniqueIdentifier} from '@dnd-kit/core'
import { CSSProperties } from '@material-ui/core/styles/withStyles'
import {CSS} from '@dnd-kit/utilities'
import {useSortable} from '@dnd-kit/sortable'


export function useSortBl(id: UniqueIdentifier) {
    const {attributes, listeners, setNodeRef, transform, transition} =
    useSortable({id})

    const style: CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition
    }

    return {attributes, listeners, setNodeRef, style}
}