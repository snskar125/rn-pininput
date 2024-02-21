# @snskar125/rn-pininput
Customizable PIN Input Component for React Native

## Usage
```javascript
import PINInput from '@snskar125/rn-pininput'
import { useState } from 'react'
export default function App(){
    const [ value, setValue ] = useState("")
    return (
        <PINInput value={value} onChangeValue={setValue}/>
    )
}
```
## Props
Prop | Type
--- | ---
value | String
onChangeValue | Function
numberOfDigits | Number
containerStyle | View Style
textStyle | Text Style
inputBoxStyle | View Style
focusedInputBoxStyle | View Style
hidden | Boolean
onPressInput | Function
hiddenCharacter | String