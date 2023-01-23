import styled from '@emotion/styled'
import { BsFillTrashFill, BsPencilFill } from "react-icons/bs";

interface GridProps<EntityModel extends Record<string, any>> {
    data: Array<EntityModel>;
    columns: Array<keyof EntityModel>;
    onDelete: (index: number) => void;
    onEdit: (index: number) => void;
}

function Grid<EntityModel extends Record<string, any>>(props: GridProps<EntityModel>) {
    return <GridWrapper>
        {
            props.columns.length === 0
                ? <EmptyError>NO DATA</EmptyError>
                : <>
                    <GridRow backGroundColor='black' color='white' isHeader={true} key={'header'}>
                        <GridCell key='header-row'>ROW</GridCell>
                        {
                            props.columns.map((col: keyof EntityModel, i: number) => {
                                return <GridCell key={i.toString()}>{col.toString().toUpperCase()}</GridCell>
                            })
                        }
                        <GridCell key='header-action'>#</GridCell>
                    </GridRow>
                    {
                        props.data.length === 0
                            ? <EmptyError>NO DATA</EmptyError>
                            : <>
                                {
                                    props.data.map((row: EntityModel, i: number) => {
                                        return <GridRow
                                            backGroundColor={(i % 2 === 0) ? '#acacad' : '#7d7d7d'}
                                            color='white'
                                            isHeader={false}
                                            key={`row-${i.toString()}`}
                                        >
                                            <GridCell key={`row-${i.toString()}-cell`}>{(i + 1).toString()}</GridCell>
                                            {
                                                props.columns.map((col: keyof EntityModel, j: number) => {
                                                    return <GridCell key={j.toString()}>{row[col]}</GridCell>
                                                })
                                            }
                                            <GridCell key='row-action'>
                                                <ActionWrapper>
                                                    <BsFillTrashFill style={{ cursor: 'pointer' }} onClick={() => props.onDelete(i)} />
                                                </ActionWrapper>
                                                <ActionWrapper>
                                                    <BsPencilFill style={{ cursor: 'pointer' }} onClick={() => props.onEdit(i)} />
                                                </ActionWrapper>
                                            </GridCell>
                                        </GridRow>
                                    })
                                }
                            </>
                    }
                </>
        }
    </GridWrapper>
}

export default Grid

const GridWrapper = styled.div(() => ({
    width: '100%',
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
}))

interface GridRowProps {
    backGroundColor: string;
    color: string,
    isHeader: boolean
}

const GridRow = styled.div((props: GridRowProps) => ({
    width: '100%',
    maxWidth: '100%',
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100px',
    backgroundColor: props.backGroundColor,
    color: props.color,
    fontWeight: props.isHeader ? 800 : 400,
    fontSize: '20px',
    ':hover': {
        backgroundColor: props.isHeader ? props.backGroundColor : '#4a4a4a',
    }
}))

const GridCell = styled.div(() => ({
    display: 'inline-flex',
    flexGrow: 1,
    flexBasis: 0,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
}))

const ActionWrapper = styled.div(() => ({
    display: 'inline-block',
    height: 'max-content',
    width: 'max-content',
    padding: '15px',
}))

const EmptyError = styled.div(() => ({
    width: '100%',
    maxWidth: '100%',
    height: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: 'red',
}))