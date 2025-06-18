import { Dispatch, useReducer } from 'react'
import { AgreementItemContent } from '.'

export const useAgreement = <T extends string>(
  itemList: AgreementItemContent<T>[]
) => {
  type ItemId = T
  const itemIdList = itemList.map(item => item.id)

  const defaultItemCheckedState = itemIdList.reduce(
    (acc, id) => ({ ...acc, [id]: false }),
    {} as Record<ItemId, boolean>
  )

  type State = Record<ItemId, boolean>

  type Action =
    | { type: 'CHECK_ITEM'; itemId: ItemId }
    | { type: 'CHECK_ALL' }
    | { type: 'UNCHECK_ALL' }

  const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case 'CHECK_ITEM':
        return { ...state, [action.itemId]: !state[action.itemId] }
      case 'CHECK_ALL': // 필수 항목들만 모두 체크
        return Object.keys(state).reduce(
          (acc, id) => ({
            ...acc,
            [id]:
              itemList.find(item => item.id === id)?.isRequired ||
              state[id as ItemId],
          }),
          {} as State
        )
      case 'UNCHECK_ALL':
        return Object.keys(state).reduce(
          (acc, id) => ({ ...acc, [id]: false }),
          {} as State
        )
      default:
        return state
    }
  }

  const [itemsChecked, dispatch]: [State, Dispatch<Action>] = useReducer(
    reducer,
    defaultItemCheckedState
  )

  const handleCheckItem = (id: ItemId) => {
    dispatch({ type: 'CHECK_ITEM', itemId: id })
  }

  const handleCheckAll = () => {
    dispatch({ type: 'CHECK_ALL' })
  }

  const handleUncheckAll = () => {
    dispatch({ type: 'UNCHECK_ALL' })
  }

  // 모든 필수 항목들의 체크 여부
  const isAgreementCheckedComplete: boolean = itemList
    .filter(item => item.isRequired)
    .every(item => itemsChecked[item.id])

  return {
    itemsChecked,
    handleCheckItem,
    handleCheckAll,
    handleUncheckAll,
    isAgreementCheckedComplete,
  }
}
