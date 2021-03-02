import {Link} from 'react-router-dom'

function TickerColumn(cell, row) {
    return (
        <>
            <Link to={`/${window.location.pathname.split('/')[1]}/${row.id}`} className="btn btn-sm btn-primary"> {cell} </Link>
        </>
    )
}

export default TickerColumn