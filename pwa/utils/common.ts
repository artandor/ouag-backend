export function getDaysBetweenDates(date1: Date, date2: Date): number {
    return Math.abs(Math.ceil((date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24)))
}

export function getUserIdFromJwt() {
    const result = parseJwt(localStorage.getItem('token'))
    return result['userId']
}

function parseJwt(token) {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map(c => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
            .join(''),
    )
    return JSON.parse(jsonPayload)
}
