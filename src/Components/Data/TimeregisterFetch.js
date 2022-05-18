
const url = 'https://localhost:7018/api/TimeRegister'

export const fetchregister = async () => {
    const response = await fetch(url)
    const json = await response.json()

    return json
}