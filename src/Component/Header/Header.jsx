import './Header.css'
import { useState, useEffect } from 'react'
import { FaSpinner } from 'react-icons/fa';

function Header() {
    const [query, setQuery] = useState('');
    const [advice, setAdvice] = useState('');
    const [error, setError] = useState('');
    const [loading , setLoading] = useState(false);
  
    
        const FetchAdvice = async () => {
            setLoading (true);
            try{
            const response = await fetch(`https://api.adviceslip.com/advice/search/${query}`)
            const data = await response.json();
            if (data.slips) {
                setAdvice(data.slips[0].advice)
        }
      
        else{
            setError("No quotes match the word you entered");
        }
      }
      
        catch{
            setError("Error Fetching Advice. Try again later");
        }

        setLoading(false);

        }

        const handleInputChange = (e) => {
            setQuery(e.target.value)
        }

        const handleClick = () => {
            setAdvice('');
            setError('');
            FetchAdvice();

        }




   
    return(
        <>
        <section className='header'>
            <div className="header-top">
                <h2>Compiled By Kelvin Njuguna</h2>
            </div>
            <div className="header-center">
                <h3>Click the button below to Generate a quote</h3>
            </div>

            <div className="header-bottom">
            <label for="name"></label>
            <input type="text" id="name" name="name" placeholder="Enter a key word" className='input-box' value={query} onChange={handleInputChange}/>
            <button type='button' onClick={handleClick}>Generate Quote</button>
            </div>



            <div className='output-div'>
                {loading && <p><FaSpinner className='faspinner'/></p>}
                {advice && <p>{advice}</p>}
                {error && <p className='error-box'> {error}</p>}
                
            </div>

        </section>
        </>
    )
}

export default Header;