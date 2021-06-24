import Head from 'next/head'
import Navbar from "../components/common/Navbar";

export default function HomePage() {
    let [isConnected, setConnected] = useState(false);

    useEffect(() => {
        authProvider.checkAuth().then(() => {
                setConnected(true)
            }
        ).catch(() => {
            setConnected(false)
        })
    }, [])

    return (
        <div>
            <Head>
                <title>Once Upon A Gift</title>
            </Head>
            <Navbar/>
        </div>
    )
}
