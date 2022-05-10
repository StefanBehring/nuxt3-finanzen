const saveToLocal = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export default saveToLocal
