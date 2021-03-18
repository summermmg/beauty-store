import React,{useState} from 'react'
import { useHistory } from 'react-router-dom'

const Search = () => {
    const [keyword, setKeyword] = useState('')  
    let history = useHistory()

    const searchHandler = (e) => {
        e.preventDefault()
        if (keyword) {
            history.push(`/?keyword=${keyword}`)
        } else {
            history.push(history.location.pathname)
        }
    }

    return (
        <div>
            <form onSubmit={searchHandler} className="d-flex input-group w-auto m-3">
                <input
                type="text"
                className="form-control"
                placeholder="Type query"
                aria-label="Search"
                onChange={(e) => setKeyword(e.target.value)}
                />
                <button
                className="btn btn-outline-primary"
                type="submit"
                data-mdb-ripple-color="dark"
                >
                Search
                </button>
            </form>
        </div>
    )
}

export default Search
