 
import Image from "next/image";
export default function Home() {
    return (
        <>
            <b>HomePage: Checking Image</b>
            <Image 
                src={'https://codedtag.com/wp-content/themes/new-codedtag/assets/img/logo-3.png'}
                alt="Large Image"
                width={150}
                height={30} 
            />
        </>
    );
}
