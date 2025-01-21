import { View } from '@ant-design/react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Children } from 'react'
import type { ViewStyle } from 'react-native'
import { StyleSheet, Text } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'

export type SelectProps = {
  children?: string | JSX.Element | JSX.Element[] | (() => JSX.Element)
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  onSelect?: (value: any) => void
  name?: string
  showSearch?: boolean
  allowClear?: boolean
  filterOption?: (input: string, option: any) => boolean
  style?: ViewStyle
  data: any[]
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
  data,
  onSelect,
  defaultValue,
}: SelectProps) => {
  const result: any[] = []
  Children.forEach(children, (child, index) => {
    result.push({ c: child, index })
  })
  return (
    <SelectDropdown
      onSelect={(selectedItem, index) => {
        onSelect?.(selectedItem)
      }}
      data={data}
      defaultValueByIndex={
        data.findIndex(item => item.value === defaultValue) ?? undefined
      }
      renderItem={(item, index, isSelected) => (
        <View
          style={{
            ...styles.selectItemStyle,
            ...(isSelected && { backgroundColor: '#D2D9DF' }),
          }}
        >
          {!!item.icon && <FontAwesomeIcon icon={item.icon} />}
          <Text style={styles.selectItemTxtStyle}>{item.title}</Text>
        </View>
      )}
      renderButton={(selectedItem, isOpened) => (
        <View
          style={{
            width: '100%',
            height: 35,
            backgroundColor: 'white',
            elevation: 3,
            borderRadius: 4,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            gap: 10,
            shadowColor: '#e0e0e0',
            borderWidth: 1,
            borderColor: '#e0e0e0',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
          }}
        >
          {!!selectedItem?.icon && <FontAwesomeIcon icon={selectedItem.icon} />}
          {!!selectedItem && (
            <Text style={{ textAlign: 'center' }}>{selectedItem.title}</Text>
          )}
        </View>
      )}
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
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 10,
  },
  selectItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
})

export { Select, SelectOption }
