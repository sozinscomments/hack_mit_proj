import '../App.css';

function Home({moveNext}) {
    
    return(
        <div className="App">
          <header className="App-header">
            <p>
              eduRACE
            </p>
            <button className="btn" onClick={moveNext}>Start!</button>
          </header>
        </div>

    )
}

export default Home;