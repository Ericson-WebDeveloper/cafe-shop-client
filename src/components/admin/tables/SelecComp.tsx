import React from 'react'
import { IVariantSelectType } from '../../../model/VariantSelectionType'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateSelectionStatus } from '../../../api/variant-api'
import { ErrorResponseF } from '../../../api/ResponseType'
import { toast } from 'react-toastify';

type Props = {
    selection: IVariantSelectType & { variant: string},
    product_id: string,
}

const SelecComp = React.memo(({selection, product_id}: Props) => {
    const queryClient = useQueryClient();
    const {isLoading, mutateAsync: onUpdateSelectionStatusMutate} = useMutation({
        mutationFn: updateSelectionStatus, 
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['selections']});
            toast.success('Updating Status Success');
        }, onError: (error: ErrorResponseF) => {
          toast.error(error.error || error.message || 'Updating Status Failed');
        }
        })

    const onSubmitUpdate = async () => {
        await onUpdateSelectionStatusMutate({ selection: selection, pid: product_id})
    }

  return (
    <>
    <tr className="text-sm text-left text-gray-300 dark:text-gray-400 items-center border-[2px] border-l-0 border-r-0 border-red-400">
      <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap ">
        {selection.name}
      </th>
      <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap ">
        PHP {selection.price.toFixed(2)}
      </th>
      <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap ">
        {selection.default_select ? 'default': 'not default'}
      </th>
      <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap ">
        {selection.status ? (
          <span className={`p-1 bg-green-600 text-white rounded-xl text-sm`}>
            Active
          </span>
        ) : (
          <span className={`p-1 bg-red-600 text-white rounded-xl text-sm`}>
            Not Active
          </span>
        )}
      </th>
      <td className="flex w-full h-full px-6 py-4 space-x-3 justify-center items-center">
        <button
          type="button" 
          className="p-2 px-4 bg-yellow-700 text-white rounded-lg font-mono hover:bg-yellow-400"
        >
         Update
        </button>
        <button
          type="button" disabled={isLoading ? true : false} onClick={onSubmitUpdate}
          className="p-2 px-4 bg-green-700 text-white rounded-lg font-mono hover:bg-green-400"
        >
          {isLoading ? 'Loading.....' : 'Update Status'}
        </button>
      </td>
    </tr>
  </>
  )
})

export default SelecComp