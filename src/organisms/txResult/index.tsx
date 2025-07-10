import React from 'react'
import { useSnackbar } from 'notistack'
import { copyToClipboard } from '../../utils/common'
import { TransactionResult } from '../cosmwasm'

import { ResultContainer, StatusTypo, Label, HashLink, Divider, PointContent, RawLog, CopyIconImg } from './styles'

interface IProps {
    result: TransactionResult
}

const TxResult = ({ result }: IProps) => {
    const { enqueueSnackbar } = useSnackbar()

    const onCopyData = (data: any) => {
        copyToClipboard(data)

        enqueueSnackbar(`Coppied [${result.pointContent.value}]`, {
            variant: 'success',
            autoHideDuration: 1000,
        })
    }

    return (
        <ResultContainer>
            {result.code !== -1 && (
                <>
                    <StatusTypo isSuccess={result.code === 0}>{result.code === 0 ? 'Success' : 'Failed'}</StatusTypo>
                    <Label>hash</Label>
                    <HashLink onClick={() => window.open(`${import.meta.env.VITE_EXPLORER}/transactions/${result.transactionHash}`)}>
                        {result.transactionHash}
                    </HashLink>
                    <Divider />
                    {result.pointContent.name !== '' && (
                        <>
                            <Label>{result.pointContent.name}</Label>
                            <PointContent onClick={() => onCopyData(result.pointContent.value)}>
                                {result.pointContent.value} <CopyIconImg />
                            </PointContent>
                        </>
                    )}
                </>
            )}
        </ResultContainer>
    )
}

export default React.memo(TxResult)
