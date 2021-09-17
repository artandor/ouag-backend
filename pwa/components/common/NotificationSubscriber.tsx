import {useEffect, useState} from 'react'
import useTranslation from "next-translate/useTranslation";
import {fetch} from "../../utils/dataAccess";

const base64ToUint8Array = base64 => {
    const padding = '='.repeat((4 - (base64.length % 4)) % 4)
    const b64 = (base64 + padding).replace(/-/g, '+').replace(/_/g, '/')

    const rawData = window.atob(b64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
}

export default function NotificationsSubscriber() {
    const {t} = useTranslation('shared');
    const [isSubscribed, setIsSubscribed] = useState(false)
    const [registration, setRegistration] = useState(null)

    useEffect(() => {
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
            // run only in browser
            navigator.serviceWorker.ready.then(reg => {
                reg.pushManager.getSubscription().then(sub => {
                    if (sub && !(sub.expirationTime && Date.now() > sub.expirationTime - 5 * 60 * 1000)) {
                        setIsSubscribed(true)
                    }
                })
                setRegistration(reg)
            })
        }
    }, [])

    const subscribeButtonOnClick = async event => {
        event.preventDefault()
        try {
            let sub = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: base64ToUint8Array(process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY)
            })
            await fetch('/notifications-subscribe', {
                method: "POST",
                body: JSON.stringify(sub)
            })

            setIsSubscribed(true);
        } catch (e) {
            console.error(e)
        }

    }

    return (
        <>
            {!isSubscribed &&
            <div className="mb-3">
                <p>{t('notificationNotSubscribedText')}</p>

                <button className="btn btn-success" onClick={subscribeButtonOnClick}>
                    {t('notificationSubscribe')}
                </button>
            </div>
            }
        </>
    )
}
