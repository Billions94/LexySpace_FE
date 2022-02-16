import axios from 'axios'
import { useState, useEffect } from 'react'
import { Button, Form, Image } from 'react-bootstrap'
import { musicIcon } from '../../../redux/store'
import SingleSong from './SingleSong'
import './styles.scss'

export default function MusicPlayer() {
    const [music, setMusic] = useState<any>(null)
    const [expand, setExpand] = useState(false)
    const [query, setQuery] = useState('')

    const fetchResultsArray = async () => {
        try {
            const { data } = await axios.get(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`)
            if (data) {
                console.log(data.data)
                setMusic(data.data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchResultsArray()
    }, [query])

    function toggle() {
        expand === false ? setExpand(true) : setExpand(false)
    }

    return (
        <div id='musicPlayer'>
            <div className='miniMusicPlaxer'>
            <Button onClick={() => toggle()}
                className='musicPlayerBtn mr-2'>
                <Image src={musicIcon} alt='' width='30px' />
            </Button>
            <div className='strong'>Mini Music Player</div>
            </div>
            {expand === false ? null :
                <>
                    <Form.Control
                        type="search"
                        value={query}
                        className='customInput'
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for songs" />
                    <>
                        <div className='mappedMusic'>
                            {music && music.slice(0, 10).map((song: any) => (
                                <SingleSong song={song} />
                            ))
                            }
                        </div>
                    </>
                </>
            }
        </div>
    )
}