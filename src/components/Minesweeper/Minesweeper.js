import React, { Component } from 'react'
import './style.scss'

class Minesweeper extends Component {
    state = {
        rows: 6,
        cols: 6,
        mineCount: [],
        mineMatrix: [],
        gameOver: 'on'
    }

    findingNeighbors = (myArray, i, j, y, x) => {
        let mineCountNearClickedElement = 0
        let adjacentCells = []
        //  now identify adjacent cells to the Cell that user have clicked recently
        adjacentCells.push((i !== 0 ? myArray[i-1][j] : '--'))
        adjacentCells.push((j !== 0 ? myArray[i][j-1] : '--'))
        adjacentCells.push((i !== 0 && j !== 0 ? myArray[i-1][j-1] : '--'))
        adjacentCells.push((i !== y ? myArray[i+1][j] : '--'))
        adjacentCells.push((j !== x ? myArray[i][j+1] : '--'))
        adjacentCells.push((i !== y && j !== x ? myArray[i+1][j+1] : '--'))
        adjacentCells.push((i !== y && j !== 0 ? myArray[i+1][j-1] : '--'))
        adjacentCells.push((i !== 0 && j !== x ? myArray[i-1][j+1] : '--'))

        if (this.state.mineCount.indexOf(myArray[i][j]) >= 0 ) {
            return 'Boom'
        }
        for(let e of this.state.mineCount) {
            if (adjacentCells.indexOf(e) >= 0) {
                mineCountNearClickedElement++
            }
        }
        
        return mineCountNearClickedElement
    }

    componentDidMount() {
        this.resetGame('')
    }

    randomNumber = (min, max, arry) => {  
        let num = Math.floor(Math.random() * (max - min) + min); 
        console.log(num)
        return num
    }

    getMineCountInCell = (x, y) => {
        let minesFoundCount = this.findingNeighbors(this.state.mineMatrix, y, x, this.state.cols-1, this.state.rows-1)
        return (minesFoundCount)
    }

    clickCell = (e, x, y) => {
        console.log(e.target.id)
        var element = document.getElementById(e.target.id)
        element.classList.add('disabled')

        console.log('Clicked on - '+this.state.mineMatrix[y][x])
        console.log('Surrounding Cells are --')

        if (this.state.mineCount.indexOf(this.state.mineMatrix[y][x]) >= 0 ) {
            this.setState({ gameOver: 'over' })
            console.log(this.state.mineCount)
        }
    }

    resetGame = (src) => {
        // find any 4 random numbers
        let arry = []
        let maxIndex = (this.state.rows * this.state.cols)
        let randomNum = this.randomNumber(1, maxIndex, arry)
        arry.push(randomNum)

        randomNum = this.randomNumber(1, maxIndex, arry)
        arry.push(randomNum)

        randomNum = this.randomNumber(1, maxIndex, arry)
        arry.push(randomNum)

        randomNum = this.randomNumber(1, maxIndex, arry)
        arry.push(randomNum)

        // set these created random numbers to state
        this.setState({ mineCount: arry }, ()=>{
            console.log(this.state)
        })

        // Create Matrix
        const matrixArr = []
        let countVal = 0
        for (let i = 0; i < this.state.rows; i++) {
            let theRow = []
            for (let j = 0; j < this.state.cols; j++) {
                theRow.push(++countVal)
            }
            matrixArr.push(theRow)
        }
        console.log(matrixArr);
        // set this created matrix to state
        this.setState({ mineMatrix: matrixArr })

        var gameCont = document.getElementById("game-cont")
        gameCont.classList.remove('over')

        if (src !== '') {
            window.location.reload(false)
        }
    }
  
    render() {
        const mineMatrix= this.state.mineMatrix
        const gameOver = this.state.gameOver
        let count = 1
        return (
            <>
            <div id="game-cont" className={`container ${gameOver}`}>
                {
                    mineMatrix.map((e, index) => (
                        <div className="ms-row" key={`row-${index}`}>
                            { 
                                e.map((f, indexTwo) => (
                                    <div 
                                        className={`cols` }
                                        key={`cell-${index}${indexTwo}`}
                                    >
                                        { this.getMineCountInCell(indexTwo, index) }
                                        { 
                                            <span 
                                                onClick={(e) => this.clickCell(e, indexTwo, index)}
                                                className="overlay-cell" 
                                                id={`cellOverlay-${index}${indexTwo}`}>
                                            </span> 
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
            <div className="container">
                <br />
                <button className="reset-button btn btn-primary" onClick={() => this.resetGame('reload')}>Reset</button>
            </div>
            </>
        )
    }
}
  
Minesweeper.propTypes = {
}
  
Minesweeper.defaultProps = {
}
  
export default Minesweeper