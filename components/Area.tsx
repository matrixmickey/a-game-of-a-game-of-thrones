export default function Area({top, left, width, height} : {top: number, left: number, width: number, height: number}) {
    return (
        <div className="area" style={{top: `${top}%`, left: `${left}%`, width: `${width}%`, height: `${height}%`}}></div>
    )
}