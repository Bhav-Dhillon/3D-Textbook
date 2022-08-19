import { useSelector } from 'react-redux';


function DiamondText(){
    const counter = useSelector(state => state.counter);

    // Change line breaks into a class with a uniform padding bottom

    if (counter === 0)
    {
        return (
            <div className='title--wrapper'>
                <h1 className='title' style={{}}>C<sub>n</sub> - Diamond</h1>
            </div>
        )
    }

    else
    {
        return (
            <div className='text--wrapper'>
                <h4>Congratulations! 🎉 You have completed this lesson!</h4>
            </div>
        )
    }
    
}

export default DiamondText;