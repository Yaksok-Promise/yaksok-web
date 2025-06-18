import { Checkbox } from '../checkbox'
import { useAgreement } from './use-agreement'

export interface AgreementItemContent<T extends string> {
  id: T
  content: string
  isRequired?: boolean
  showDetailButton?: boolean
}

export interface AgreementItemProps<T extends string>
  extends AgreementItemContent<T> {
  checked: boolean
  setChecked: (id: T) => void
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
      <span className="text-subhead1">전체 동의</span>
    </button>
  )
}

function Agreement<T extends string>({
  itemList,
  agreementHook,
}: {
  itemList: AgreementItemContent<
    T extends string ? (string extends T ? never : T) : T
  >[]
  agreementHook: ReturnType<typeof useAgreement<T>>
}) {
  const {
    itemsChecked,
    handleCheckItem,
    handleCheckAll,
    handleUncheckAll,
    isAllAgreementChecked,
  } = agreementHook

  const handleCheckAllButtonClick = () => {
    if (isAllAgreementChecked) {
      handleUncheckAll()
    } else {
      handleCheckAll()
    }
  }

  return (
    <div className="flex w-full flex-col gap-[32px]">
      <CheckAllButton
        checked={isAllAgreementChecked}
        setChecked={handleCheckAllButtonClick}
      />
      <ul className="flex flex-col gap-[20px]">
        {itemList.map(props => (
          <AgreementItem<T>
            key={props.id}
            checked={itemsChecked[props.id]}
            setChecked={handleCheckItem as (id: T) => void}
            {...props}
          />
        ))}
      </ul>
    </div>
  )
}

function AgreementItem<T extends string>({
  id,
  content,
  isRequired,
  showDetailButton,
  checked,
  setChecked,
}: AgreementItemProps<T>) {
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
        <Checkbox checked={checked} />
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
