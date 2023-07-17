export const loadJson = async (path: string) => {
  const response = await fetch(path)
  const data = await response.json()
  return data
}
