import { useState } from 'react'
import { Text } from 'react-native'
import type { AutocompleteInputProps } from 'react-native-autocomplete-input'
import AutocompleteInput from 'react-native-autocomplete-input'

type Props = {
  options: Array<any>
} & Omit<AutocompleteInputProps<any>, 'data'>
export const AutoComplete = ({ options, ...rest }: Props) => {
  const [open, setIsOpen] = useState(false)
  return (
    <AutocompleteInput
      {...rest}
      data={options}
      onFocus={() => setIsOpen(true)}
      onBlur={() => setIsOpen(false)}
      hideResults={!open}
      flatListProps={{
        keyExtractor: (_, idx) => idx.toString(),
        renderItem: ({ item }: { item: any }) => <Text>{item.value}</Text>,
      }}
    />
  )
}
