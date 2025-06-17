import { Checkbox } from '../checkbox'
import { useAgreement } from './use-agreement'

export interface AgreementItemContent {
  id: string
  content: string
  isRequired?: boolean
  showDetailButton?: boolean
}

export interface AgreementItemProps extends AgreementItemContent {
  checked: boolean
  setChecked: (id: string) => void
}

function CheckAllButton({
  checked,
  setChecked,
}: {
  checked: boolean
  setChecked: (prev: boolean) => void
}) {
  const handleClick = () => {
    setChecked(!checked)
  }

  return (
    <button
      className="clickable flex flex-1 items-center gap-[16px] text-body2"
      onClick={handleClick}
    >
      <Checkbox checked={checked} setChecked={handleClick} theme="rounded" />
      <p className="flex items-center gap-[4px]">
        <span className="text-subhead1">전체 동의</span>
        <span className="text-body2 text-gray04">(선택 항목 제외)</span>
      </p>
    </button>
  )
}

function Agreement({ itemList }: { itemList: AgreementItemContent[] }) {
  const {
    itemsChecked,
    handleCheckItem,
    handleCheckAll,
    handleUncheckAll,
    isAgreementCheckedComplete,
  } = useAgreement(itemList)

  const handleCheckAllButtonClick = () => {
    if (isAgreementCheckedComplete) {
      handleUncheckAll()
    } else {
      handleCheckAll()
    }
  }

  return (
    <div className="flex w-full flex-col gap-[32px]">
      <CheckAllButton
        checked={isAgreementCheckedComplete}
        setChecked={handleCheckAllButtonClick}
      />
      <ul className="flex flex-col gap-[20px]">
        {itemList.map(props => (
          <AgreementItem
            key={props.id}
            checked={itemsChecked[props.id]}
            setChecked={handleCheckItem}
            {...props}
          />
        ))}
      </ul>
    </div>
  )
}

function AgreementItem({
  id,
  content,
  isRequired,
  showDetailButton,
  checked,
  setChecked,
}: AgreementItemProps) {
  const requirementLabel = isRequired ? '필수' : '선택'

  const handleItemClick = () => {
    setChecked(id)
  }

  return (
    <li className="flex w-full list-none flex-row items-center justify-between">
      <button
        className="clickable flex flex-1 items-center gap-[20px] text-body2"
        onClick={handleItemClick}
      >
        <Checkbox checked={checked} setChecked={handleItemClick} />
        <span>{`(${requirementLabel}) ${content}`}</span>
      </button>
      {showDetailButton && (
        <button className="clickable text-body2 text-gray04 underline">
          보기
        </button>
      )}
    </li>
  )
}

export { Agreement, CheckAllButton, AgreementItem }
