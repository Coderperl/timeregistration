const url = 'https://localhost:7018/api/customer'

export const fetchCustomers = async () => {
    const response = await fetch(url)
    const json = await response.json()
    return json

}