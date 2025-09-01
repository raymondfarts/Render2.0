export default function Search(props){
    return(
    <>
    <h2>Find a person</h2>
    <div>Search for: <input name="filter" onChange={props.handleChange}/></div>
    </>    
    )
}