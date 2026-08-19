import {useEffect, useState} from "react";

export default function HomePage() {

    const [count, setCount] = useState<number>(0);

    function counterIncrease() {
        setCount(count+1);
    }

    useEffect(() => {
        console.log(count)
    }, [count]);

    return(
        <>
            <h1 style={{ fontSize: "32px", margin: "50px" }}>
                Willkommen!
            </h1>

            <h2>{count}</h2>
            <button onClick={counterIncrease}>
                Increase the counter value
            </button>
        </>
    )
}