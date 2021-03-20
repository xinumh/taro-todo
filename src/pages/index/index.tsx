import React, { useState } from 'react'
import { View, Text, Input, Checkbox, Label, CheckboxGroup} from '@tarojs/components'
import { AtButton } from 'taro-ui'
import { InputProps } from '@tarojs/components/types/Input'
import { CheckboxProps } from '@tarojs/components/types/Checkbox'

import "taro-ui/dist/style/components/button.scss" // 按需引入

import './index.scss'


export default () => {
  const [newTodoText, setNewTodoText] = useState('')
  const [todoList, setTodoList] = useState<{
    text: string,
    isComplete: Boolean
  }[]>([])
  const handleInput: InputProps['onInput'] = e => {
    setNewTodoText(e.detail.value)
  }
  const handleClick = () => {
    setTodoList(prevList => {
      return [...prevList, {isComplete: false, text: newTodoText}]
    })
    setNewTodoText('')
  }
  const handleCheck: CheckboxProps['onChange'] = e => {
    setTodoList(prevList => {
      return prevList.map(d => {
        return {
          text: d.text,
          isComplete: e.detail.value.indexOf(d.text) > -1
        }
      })
    })
  }
  return (
    <View>
      <Input value={newTodoText} onInput={handleInput} />

      <AtButton onClick={handleClick}>add todo</AtButton>
      <View>
        <CheckboxGroup onChange={handleCheck} >
          {
            todoList.map(d => (
              <View key={d.text}>
                <Label className={d.isComplete ? 'complete' : ''}>
                  <Checkbox value={d.text} />
                  <Text>{d.text}</Text>
                </Label>
              </View>
            ))
          }
        </CheckboxGroup> 
      </View>
    </View>
  )
}
