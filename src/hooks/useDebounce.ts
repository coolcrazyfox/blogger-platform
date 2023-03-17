import { useEffect, useState } from "react";

export default function useDebounce(value: any, delay: number, callback?: any) {
  
  const [debouncedValue, setDebouncedValue] = useState(value)

  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
      callback?.()
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [callback, delay, value])


  return debouncedValue
}