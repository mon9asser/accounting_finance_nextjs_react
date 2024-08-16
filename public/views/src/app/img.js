import Image from "next/image"

var LazyImage = ({souce}) => {

    return <Image 
        src={souce}
        height={100}
        width={200}
        property="true"
        alt='thank you'
    />;
}

export default LazyImage;
