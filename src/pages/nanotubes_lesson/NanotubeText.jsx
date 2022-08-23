import { useSelector } from 'react-redux';


function NanotubeText(){
    const counter = useSelector(state => state.counter);

    // Change line breaks into a class with a uniform padding bottom

    if (counter === 0)
    {
        return (
            <div className='title--wrapper'>
                <h1 className='title'>C<sub>n</sub> - Nanotubes</h1>
            </div>
        )
    }

    else if (counter === 1)
    {
        return (
            <div className='text--wrapper' style={{fontSize: 20}}>
                <p>Diamonds are the hardest of all substances. They contain only carbon atoms, just like Fullerenes and Nanotubes. 
                    Diamonds however, have their carbon atoms arranged in a <span>tetrahedral lattice</span>. 
                </p>
            </div>
        )
    }

    else if (counter === 2)
    {
        return(
            <div className='text--wrapper2'>
                <p>The rest of this lesson is actively being developed. Please see the lesson on <span>Fullerenes</span> for an example of the
                    minimal viable product (MVP) of the project. 
                </p>
            </div>
        )
    }
    
}

export default NanotubeText;