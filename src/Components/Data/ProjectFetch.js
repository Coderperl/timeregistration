const url = 'https://localhost:7018/api/project'

export const fetchproject = async () => {
    const response = await fetch(url)
    const json = await response.json()

    return json
}