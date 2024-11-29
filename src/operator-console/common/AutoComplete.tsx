import type { AutocompleteInputProps } from 'react-native-autocomplete-input'
import AutocompleteInput from 'react-native-autocomplete-input'

type Props = {
  options: Array<any>
} & Omit<AutocompleteInputProps<any>, 'data'>
export const AutoComplete = ({ options, ...rest }: Props) => (
  <AutocompleteInput {...rest} data={options} />
)
