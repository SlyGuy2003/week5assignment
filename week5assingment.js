class Game { //creating a Game class that takes two arguments
    constructor(name, release){
        this.name = name;
        this.release = release;
    }

    describe(){ //function that describes the game
        return `${name} was released on ${release}.`;
    }
}

class developer { ///creating a developer class that takes a single argument
    constructor(name) {
        this.name = name;
        this.game = []; //creating an array that will hold all the games for a certain developer
    }

    addgame(game) { // function that adds a new game to the game array
        if (game instanceof Game) {
            this.game.push(game);
    }   else {
            throw new Error(`you can only add an instance of Game. argument is not a game ${game}`);
        }  // ^^ throws out an error if trying to add something that isnt recognized as a game
    }
    describe(){ // describes the developer
        return `${this.name} has ${this.game.length} games.`;
    }
}
class Menu{ // creating the menu class that will hold all the functions and information for the menu options
    constructor(){
        this.developers = [] // array to hold all of the developers
        this.selected = null // variable that holds the current selected developer
    }
    start() {
        let selection = this.showMainMenuOptions() // fucntion that starts the menu and takes the users  
        while (selection != 0){                    // input and reads it, calls the corrisponding function
            switch (selection){
                case '1':
                    this.createdeveloper()
                    break
                case '2':
                    this.veiwdeveloper()
                    break
                case '3':
                    this.deletedeveloper()
                    break
                case'4':
                    this.displaydevelopers()
                break
                default:
                    selection = 0
            }
            selection = this.showMainMenuOptions()
        }

        alert('goodbye!') //once the user exits, posts a goodbye message
    }

    showMainMenuOptions(){ //function that prompts the main menu options
        return prompt(`
        0: Exit
        1: Create new developer
        2: Veiw developer
        3: Delete developer
        4: Veiw all developers
        `)
    }
    showDeveloperMenuOptions(gameinfo) { //function that shows gameinfo and a sub menus options
        return prompt (`
        0: Back
        1: Create game
        2: Delete game
        --------------------
        ${gameinfo}`)

    }
    displaydevelopers(){  // displays all the currently entered developers using the developers array
        let developerstr = '' //creates an empty string to later be added onto, printing all of the developer names
        for (let i = 0; i < this.developers.length; i++){
            developerstr += i + ') ' + this.developers[i].name + '\n'
        }
        alert(developerstr)
    }
    createdeveloper(){ //creates a new developer and adds it to the developer array
        let name = prompt('Enter name for new developer: ')
        this.developers.push(new developer(name)) // adding the new developer to the developer array
    }
    veiwdeveloper() { // views a specific developer, then gives extra options
        let index = prompt('Enter the index of what developer you wish to veiw')
        if (index > -1 && index < this.developers.length) {
            this.selected = this.developers[index]
            let description = `developer name; ` + this.selected.name + '\n' //creates a description variable that is going to be used to show developer information
            
            for(let i = 0; i < this.selected.game.length; i++) { // adds the current games assigned to that developer to the description variable 
                description += i + ') ' + this.selected.game[i].name + ' - ' + this.selected.game[i].release + '\n'
            }
            let selection = this.showDeveloperMenuOptions(description) // prompts the users with the developer sub menu
            switch(selection) {                                        // reads users input and calls the correspoding function 
                case '1':
                    this.creategame()
                    break
                case '2':
                    this.deletegame()
            }
        }
    } 
    deletedeveloper(){ //function that reads a users input index and deletes the index from the array
    let index = prompt('Enter the index of the developer you want to delete: ')
    if (index > -1 && index < this.developers.length){ //checks to make sure the given input is an actual index in developers
        this.developers.splice(index, 1) 
    }
    }
    creategame() { // function that can be called in the developer sub menu that adds a game to the game array via user input
        let name = prompt('Enter name of new game: ')
        let release = prompt('Enter date that game was released: ')
        this.selected.game.push(new Game(name, release)) //creates a new instance of Game class then pushes the object to the game array
    }  
    deletegame() { // function that can be called in the developer sub menu that calls for an index from the user and deletes that index
        let index = prompt('Enter the index of game that you are trying to delete: ')
        if (index  > -1 && index < this.selected.game.length) {
            this.selected.game.splice(index, 1) //removes game based on user input
        }

    }
    
}

let menu = new Menu() // creates a new Menu instance
menu.start() //calls the start function that calls for the first menu to appear