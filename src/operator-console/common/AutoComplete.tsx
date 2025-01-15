import { useRef } from 'react'
import type {
  IAutocompleteDropdownProps,
  IAutocompleteDropdownRef,
} from 'react-native-autocomplete-dropdown'
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'

type Props = {
  options: Array<{ value: string }>
  value?: string
} & Omit<IAutocompleteDropdownProps, 'dataSet'>
export const AutoComplete = ({ options, onChangeText, ...rest }: Props) => {
  const dropdownController = useRef<IAutocompleteDropdownRef | null>(null)

  return (
    <AutocompleteDropdown
      {...rest}
      controller={controller => {
        dropdownController.current = controller
      }}
      // containerStyle={{ zIndex: 1, backgroundColor: 'yellow' }}
      dataSet={options.map((item, index) => ({
        id: index.toString(),
        title: item.value,
      }))}
      useFilter={false}
      onChangeText={onChangeText}
      onSelectItem={item => onChangeText?.(item?.title ?? '')}
      direction='down'
      suggestionsListContainerStyle={{
        height: 300,
        width: '100%',

        position: 'absolute',
      }}
      suggestionsListMaxHeight={300}
      rightButtonsContainerStyle={{ height: 35, marginRight: 0 }}
      inputContainerStyle={{
        backgroundColor: 'white',
        borderColor: '#d9d9d9',
        borderWidth: 1,
        margin: 0,
        height: 40,
      }}
      onRightIconComponentPress={() => {
        dropdownController.current?.toggle()
      }}
    ></AutocompleteDropdown>
  )
}
