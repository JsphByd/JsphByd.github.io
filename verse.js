var verse = "John+11:35"
const API_AUTH = "e3210c395a706385d82e581dd6a614061e63acdc" //Psst! You normally should never expose your API key - but I do not care if you steal it.
const right_arrow = document.getElementById("right_arrow")
const left_arrow = document.getElementById("left_arrow")
let passage
var mode = 0
const verseSelectForm = document.getElementById("options")

// document.getElementById("back").addEventListener("submit", function(event) {
//     event.preventDefault()
//     displayMode(0)
// })

// document.getElementById("memorize").addEventListener("submit", function(event){
//     event.preventDefault()
//     var verseInput = document.getElementById("verseInput").value;
//     //ignore case when comparing words
//     //ignore punctuation
//     //remove double spaces (?)
//     verseInput = verseInput.replace(/\s\s+/g, ' ')
//     verseInput = verseInput.replace(/[\!&,;\.]/g, '')
//     verseInput = verseInput.toLowerCase()
//     passage = passage.trim()
//     verseInput = verseInput.trim()
//     var substring1 = ""
//     var substring2 = ""

//     for(var i = 0; i < verseInput.length || i < passage.length; i++)
//     {
//         if(verseInput[i] !== passage[i])
//         {
//             substring1 = verseInput.substring(0, i+5)
//             substring2 = passage.substring(0,i+5)
//             break
//         }
//     }

//     if(substring1 === "")
//     {
//         document.getElementById("text").innerText = "PERFECT!"
//         document.getElementById("text").style.display = "flex"
//         document.getElementById("actualText").style.display = "none"
//     }
//     else //want mistake to be highlighted 
//     {
//         document.getElementById("text").innerText = "Your Attempt - " + substring1
//         document.getElementById("text").style.display = "flex"

//         document.getElementById("actualText").innerText = "Actual Verse - " + substring2
//         document.getElementById("actualText").style.display = "flex"
//     }
// })

// verseSelectForm.addEventListener("submit", async function(event) {
//     event.preventDefault()
//     let API_URL
//     var dropdown = document.getElementById("bibleBooks")
//     var selectedOption = dropdown.options[dropdown.selectedIndex]
//     var book = selectedOption.value
//     const chapter = document.getElementById("chapter").value
//     const verseStart = document.getElementById("verseStart").value
//     const verseEnd = document.getElementById("verseEnd").value
//     //alert(`${book} ${chapter}:${verseStart}-${verseEnd}`)

//     /*
//         'indent-poetry': False,
//         'include-headings': False,
//         'include-footnotes': False,
//         'include-verse-numbers': False,
//         'include-short-copyright': False,
//         'include-passage-references': False
//     */

//     if(chapter === "")
//     {
//         alert("Chapter Must be Filled")
//     }
//     else if(verseStart === "")
//     {
//         API_URL = `https://api.esv.org/v3/passage/text/?include-verse-numbers=false&include-headings=false&include-footnotes=false&include-short-copyright=false&include-passage-references=false&indent-poetry=false&q=${book}+${chapter}`
//     }
//     else if(verseEnd === "")
//     {
//         API_URL = `https://api.esv.org/v3/passage/text/?include-verse-numbers=false&include-headings=false&include-footnotes=false&include-short-copyright=false&include-passage-references=false&indent-poetry=false&q=${book}+${chapter}:${verseStart}`
//     }
//     else if(verseEnd !== "")
//     {
//         API_URL = `https://api.esv.org/v3/passage/text/?include-verse-numbers=false&include-headings=false&include-footnotes=false&include-short-copyright=false&include-passage-references=false&indent-poetry=false&q=${book}+${chapter}:${verseStart}-${verseEnd}`
//     }
//     else
//     {
//         alert("Something bad has occured!")
//     }

//     const response = await fetch(API_URL, {
//         headers: {
//             'Authorization': `Token ${API_AUTH}`
//         }
//     })
//     .catch(error => {
//         console.error("Error Fetching Data:",error)
//     })
//     passage = await response.json()
//     passage = passage.passages
//     passage = passage.toString()
//     document.getElementById("memorize_target").innerText = `${book} ${chapter}:${verseStart}-${verseEnd}`
//     passage = passage.replace(/\s\s+/g, ' ')
//     passage = passage.replace(/[\!&,;\.]/g, '')
//     passage = passage.replace(/[^\x00-\x7F]/g, '')
//     passage = passage.toLowerCase()
    
//     displayMode(1)
// })

// function displayMode(mode)
// {
//     const memorize_elements = document.getElementById("memorize_box")
//     const select_elements = document.getElementsByClassName("form_box")

//     if(mode === 0) //mode 0 - show options, not memorize
//     {
//         memorize_elements.style.display = "none";
//         select_elements.style.display = "flex";
//    }
//     else if(mode === 1) //mode 1 - show memorize, not options
//     {
//         memorize_elements.style.display = "flex";
//         select_elements.style.display = "none";
//     }
// }

right_arrow.addEventListener("click", function() {
    alert("right_arrow")
})

left_arrow.addEventListener("click", function() {
    alert("left_arrow")
})
