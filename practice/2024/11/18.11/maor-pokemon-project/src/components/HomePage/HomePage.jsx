import Card from "../Card/Card";

const HomePage = ({setUserChoice , setDidUserClick})=>{
    return(
        <div>
            <h1>Pokemons</h1>
            <Card setUserChoice = {setUserChoice} setDidUserClick = {setDidUserClick}/>
        </div>
    )
}

export default HomePage;