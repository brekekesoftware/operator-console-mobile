import type {
  DraggableStackProps,
  ObjectWithId,
} from '@mgcrea/react-native-dnd'
import {
  DndProvider,
  Draggable,
  DraggableStack,
} from '@mgcrea/react-native-dnd'
import type { FunctionComponent } from 'react'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const items = ['🤓', '🤖🤖', '👻👻👻', '👾👾👾👾']
const data = items.map((letter, index) => ({
  value: letter,
  id: `${index}-${letter}`,
})) satisfies ObjectWithId[]

export const DraggableStackExample: FunctionComponent = () => {
  const onStackOrderChange: DraggableStackProps['onOrderChange'] = value => {
    console.log('onStackOrderChange', value)
  }
  const onStackOrderUpdate: DraggableStackProps['onOrderUpdate'] = value => {
    console.log('onStackOrderUpdate', value)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DraggableStack Example</Text>
      <DndProvider>
        <DraggableStack
          direction='row'
          gap={10}
          style={styles.stack}
          onOrderChange={onStackOrderChange}
          onOrderUpdate={onStackOrderUpdate}
        >
          {data.map(letter => (
            <Draggable
              key={letter.id}
              id={letter.id}
              style={[styles.draggable]}
            >
              <Text style={styles.text}>{letter.value}</Text>
            </Draggable>
          ))}
        </DraggableStack>
      </DndProvider>
    </View>
  )
}
