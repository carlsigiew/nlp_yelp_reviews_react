import Button from "./Button"

const Header = (props) => {
  const onClick = () => {
    console.log("Clicked")
  }
  return (
    <header className='header'>
        <h1>{props.title}</h1>
        <Button color='green' text='Hello' onClick={onClick}/>
    </header>
  )
}

Header.defaultProps = {
    'title': "Deafult Tile"
}

// CSS inline
// const headingStyle = {
//     color: 'red',
//     backgroundColor:'black'
// }

export default Header