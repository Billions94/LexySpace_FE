export interface IHome {
    username: string
    setUsername: (value: string) => void
    loggedIn: boolean
    setLoggedIn: (value: boolean) => void
}