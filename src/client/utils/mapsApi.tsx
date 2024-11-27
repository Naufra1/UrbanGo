type MapsType = {
    origin: string
    destination: string
}

export default function Maps({origin, destination}:MapsType) {
    const key = process.env.GOOGLE_API_KEY
    const generateMap = ():string => {
        return `https://maps.googleapis.com/maps/api/staticmap?size=900x600&zoom=12&path=color:blue|weight:5|${encodeURIComponent(
            origin
          )}|${encodeURIComponent(destination)}&key=${key}`
    }
    const map = generateMap()
    return (
        <img src={map} alt="Mapa estático com rota" style={{ width: "100%" }} />
    )
}
