import React, { useState } from 'react'

export default function Counter() {
    const [Counter, SetCounter] = useState(5)
  return (
    <div>
        counter : {Counter}
        <button onClick={()=> SetCounter(Counter + 1)}>+</button>
        <button onClick={()=> SetCounter(Counter - 1)}>-</button>
    </div>
  )
}
