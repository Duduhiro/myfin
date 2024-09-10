import Image from 'next/image'

export default function LoginDrawing({ height, width }: { height: number, width: number }) {
    return <Image src="/MyFinLogo.png" alt="login drawing" width={width} height={height}/>
}