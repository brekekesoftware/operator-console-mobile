import { useRef, useState } from 'react'
import type {
  IAutocompleteDropdownProps,
  IAutocompleteDropdownRef,
} from 'react-native-autocomplete-dropdown'
import {
  AutocompleteDropdown,
  AutocompleteDropdownItem,
} from 'react-native-autocomplete-dropdown'

type Props = {
  options: Array<{ value: string }>
  value?: string
} & Omit<IAutocompleteDropdownProps, 'dataSet'>
export const AutoComplete = ({ options, onChangeText, ...rest }: Props) => {
  const [open, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const dropdownController = useRef<IAutocompleteDropdownRef | null>(null)

  const filterSearch = () =>
    options.filter(item =>
      item.value.toLowerCase().includes(query.toLowerCase().trim()),
    )
  console.log(
    '#Duy Phan console options',
    options.map((item, index) => ({ id: index.toString(), title: item.value })),
  )

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
      // renderItem={item => (
      //   <TouchableOpacity style={{ height: 35, justifyContent: 'center' }}>
      //     <Text>{item.title}</Text>
      //   </TouchableOpacity>
      // )}
      suggestionsListContainerStyle={{
        height: 300,
        width: '100%',
        // zIndex: 10,
        position: 'absolute',
      }}
      suggestionsListMaxHeight={300}
      onOpenSuggestionsList={open1 =>
        console.log('#Duy Phan console open', open1)
      }
      inputContainerStyle={{
        backgroundColor: 'white',
        borderColor: '#d9d9d9',
        borderWidth: 1,
        padding: 5,
        height: 35,
      }}
      onRightIconComponentPress={() => {
        dropdownController.current?.toggle()
      }}
    ></AutocompleteDropdown>
  )
}
