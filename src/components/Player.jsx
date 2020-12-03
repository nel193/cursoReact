import React, {useState, useEffect} from "react"
import {connect} from "react-redux"
import {getVideoSource} from "../actions"
import NotFound from "../containers/NotFound"
import "../assets/styles/components/Player.scss"
const Player = (props) => {    
    const {id} = props.match.params;
    const [loading, setLoading] = useState("")
    const hasPlaying = Object.keys(props.playing).length > 0;
    useEffect(()=>{
        props.getVideoSource(id)
        setLoading(false)
    }, [])

    if(loading) return <h3>Cargando..</h3>
    return hasPlaying ? (
        <div className="Player">
            <video controls autoPlay>
                <source src={props.playing.source} type='video/mp4' />
            </video>
            <div className='Player-back'>
                <button type = 'button' onClick={()=> props.history.goBack()}>
                    Regresar
                </button>
            </div>
        </div>
    ) : <NotFound/>
}

const mapStateToProps = state => {
    return{
        playing: state.playing,
    }
} 

const mapDispatchToProps = {
    getVideoSource,
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)