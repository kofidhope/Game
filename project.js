const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOL_COUNT = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8
}
const SYMBOL_VALUES = {
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2
}



// deposite amount
const deposit = ()=>{
    while(true){
    const depositAmount = prompt("Deposit Amount: ")
    const numberDepositAmount = parseFloat(depositAmount)
    if(isNaN(numberDepositAmount) || numberDepositAmount <= 0){
        console.log("invalid amount, try again")
    }else{
        return numberDepositAmount;
    } 
 }
}



// function of number lines for the bet 

const getNumberOfLines = ()=>{
    while(true){
        const lines = prompt("Enter number of lines for the bet (1-3): ")
        const numberOfLines = parseFloat(lines)
        if(isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines >3){
            console.log("invalid number of lines")
        }else{
            return lines;
        } 
     }
}

const getBet =(balance,lines)=>{
    while(true){
        const bet = prompt("Enter the bet per lines: ")
        const numberbet = parseFloat(bet)
        if(isNaN(numberbet) || numberbet <= 0 || numberbet > balance/lines){
            console.log("invalid bet,try again")
        }else{
            return numberbet;
        } 
     }
}
 // spin the slot machine

const spin =()=>{
    // array that contains the possible symbols that we can have
    const symbols = [];
    // looping through all of the different edntries that we have in my symbol object
    for(const [symbol,count] of Object.entries(SYMBOL_COUNT)){
       //adding symbols to the symbol array
       for(let i = 0; i < count; i++){
          symbols.push(symbol); // this going to add how many symbols we had into the symbol array          
       }
    }
    const reels = []
    for(let i = 0; i < COLS; i++){
        reels.push([])
        const reelSymbols = [...symbols] // copying all the available symbols
        for(let j = 0; j < ROWS; j++){
            const randomIndex = Math.floor(Math.random()* reelSymbols.length)
            const selectedSymbol = reelSymbols[randomIndex]
            reels[i].push(selectedSymbol)
            reelSymbols.splice(randomIndex,1)
        }
    }
    return reels;
}

const transpose = (reels) =>{
    const rows = []
    for(let i = 0; i<ROWS; i++){
        rows.push([])
        for(let j = 0; j<COLS; j++){
           rows[i].push(reels[j][i]) 
        }
    }
    return rows;
}
const printRows = (rows)=>{
    for( const row of rows){
        let rowString = "";
        for(const[i,symbol] of row.entries()){
            rowString += symbol;
            if(i != row.length-1){
                rowString += " | "
            }
        }
        console.log(rowString);
    }
}
const getWinnings =(rows,bet,lines)=>{
    let winnings = 0;
    for(let row = 0; row <lines; row++){
        const symbols = rows[row];
        let allSame = true;

        for(const symbol of symbols){
            if(symbol != symbols[0])
            allSame = false;
            break;
        }

        if(allSame){
            winnings += bet*SYMBOL_VALUES[symbols[0]];
        }
    }
    return winnings;
}

const game =()=>{
    let balance = deposit();
    //console.log(depositAmount);
    while(true){
        console.log("You have a balance of $" + balance)
        const  numberOfLines = getNumberOfLines();
        const bet = getBet(balance,numberOfLines);
        balance -= bet*numberOfLines;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows,bet,numberOfLines);
        balance += winnings;
        console.log("You Won, $" + winnings.toString());
    
        if(balance <=0 ){
            console.log("You run out of money!");
            break;
        }

        const playAgain = prompt("Do you want play again (y/n)?");
        if(playAgain != "y") break;
    }

}

game();