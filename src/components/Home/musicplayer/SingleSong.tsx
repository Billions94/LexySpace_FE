import { useState, createRef } from 'react'
import { Image } from 'react-bootstrap'
import { playIcon, pauseIcon } from '../../../redux/store'


interface SingleSongProps {
    song: any
}

export default function SingleSong({ song }: SingleSongProps) {

    const refs = createRef<HTMLAudioElement>()
    const [isPlaying, setIsPlaying] = useState(false)

    function togglePlay() {
        isPlaying === false ? play() : pause()
    };

    const play = () => {
        setIsPlaying(true)
        refs.current!.play()
    }
    const pause = () => {
        setIsPlaying(false)
        refs.current!.pause()
    }

    return (
        <>
            <div onClick={() => togglePlay()}
                className='musicInfo'>
                <div className='position-relative'>
                    <Image className='albumPicture' roundedCircle src={song?.album?.cover_medium} alt='' width='60px' height='60px' />
                </div>
                <div className='playStatus'>
                    {isPlaying === false ?
                        <Image roundedCircle src={playIcon} alt='' width='30px' height='30px' />
                        :
                        <Image roundedCircle src={pauseIcon} alt='' width='30px' height='30px' />
                    }
                </div>
                <p className='strong'>{song?.title_short}</p>
            </div>
            <audio
                ref={refs}
                src={song?.preview}
            />
        </>
    )
}