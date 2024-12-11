import { View } from '@ant-design/react-native'
import { Children } from 'react'
import type { ViewStyle } from 'react-native'
import { StyleSheet, Text } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'

export type SelectProps = {
  children: string | JSX.Element | JSX.Element[] | (() => JSX.Element)
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  onSelect?: (value: string) => void
  name?: string
  showSearch?: boolean
  allowClear?: boolean
  filterOption?: (input: string, option: any) => boolean
  style?: ViewStyle
}

type OptionProps = {
  value: string | Element
  isSelected?: boolean
  children?: string | JSX.Element | JSX.Element[] | React.ReactNode
  title?: string
}

const Select = ({
  children,
  value,
  name,
  showSearch,
  allowClear,
  filterOption,
}: SelectProps) => {
  const result: any[] = []
  Children.forEach(children, (child, index) => {
    result.push({ c: child })
  })
  return (
    <SelectDropdown
      onSelect={(selectedItem, index) => {
        console.log(selectedItem, index)
      }}
      data={result}
      renderItem={(item, index, isSelected) => <item.c />}
      renderButton={(selectedItem, isOpened) => <View></View>}
      search={showSearch}
    />
  )
}

const SelectOption = ({ value, isSelected, children, title }: OptionProps) => (
  <>
    {Children.map(children, child => (
      <View>{typeof child === 'string' ? <Text>{child}</Text> : child}</View>
    ))}
    <View
      style={{
        ...styles.selectItemStyle,
        ...(isSelected && { backgroundColor: '#D2D9DF' }),
      }}
    >
      <Text style={styles.selectItemTxtStyle}>{title}</Text>
    </View>
  </>
)

const styles = StyleSheet.create({
  selectItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  selectItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
})

export { Select, SelectOption }
