var verse = "John+11:35"
const API_AUTH = "e3210c395a706385d82e581dd6a614061e63acdc" //Psst! You normally should never expose your API key - but I do not care if you steal it.
const right_arrow = document.getElementById("right_arrow")
const left_arrow = document.getElementById("left_arrow")
const mem_option_array = Array.from(document.querySelectorAll(".mem_option"))
const mem_options_length = document.getElementsByClassName("mem_option").length - 1
const memorize_box_read_text = document.getElementById("read_text")
const memorize_box_read = document.getElementById("memorize_box_read")
const submit_blind = document.getElementById("submit_blind")
const memorize_box_blind_result_back = document.getElementById("memorize_box_blind_result_back")
var mem_options_position = 0
let passage
var mode = 0
const verseSelectForm = document.getElementById("options")
mem_option_array[0].style.left = "50%";

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

//     for(var input_index = 0; input_index < verseInput.length || input_index < passage.length; input_index++)
//     {
//         if(verseInput[input_index] !== passage[input_index])
//         {
//             substring1 = verseInput.substring(0, input_index+5)
//             substring2 = passage.substring(0,input_index+5)
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

verseSelectForm.addEventListener("submit", async function(event) {
    event.preventDefault()
    let API_URL

    //Get the book 
    var dropdown = document.getElementById("bibleBooks")
    var selectedOption = dropdown.options[dropdown.selectedIndex]
    var book = selectedOption.value
    //Get the chapter and verse start/end
    const chapter = document.getElementById("chapter").value
    const verseStart = document.getElementById("verseStart").value
    const verseEnd = document.getElementById("verseEnd").value
    //alert(`${book} ${chapter}:${verseStart}-${verseEnd}`)

    /*
        'indent-poetry': False,
        'include-headings': False,
        'include-footnotes': False,
        'include-verse-numbers': False,
        'include-short-copyright': False,
        'include-passage-references': False
    */

    if(chapter === "")
    {
        alert("Chapter Must be Filled")
    }
    else if(verseStart === "")
    {
        API_URL = `https://api.esv.org/v3/passage/text/?include-verse-numbers=false&include-headings=false&include-footnotes=false&include-short-copyright=false&include-passage-references=false&indent-poetry=false&q=${book}+${chapter}`
    }
    else if(verseEnd === "")
    {
        API_URL = `https://api.esv.org/v3/passage/text/?include-verse-numbers=false&include-headings=false&include-footnotes=false&include-short-copyright=false&include-passage-references=false&indent-poetry=false&q=${book}+${chapter}:${verseStart}`
    }
    else if(verseEnd !== "")
    {
        API_URL = `https://api.esv.org/v3/passage/text/?include-verse-numbers=false&include-headings=false&include-footnotes=false&include-short-copyright=false&include-passage-references=false&indent-poetry=false&q=${book}+${chapter}:${verseStart}-${verseEnd}`
    }
    else
    {
        alert("Something bad has occured!")
    }

    //fetch the data using the URL
    const response = await fetch(API_URL, {
        headers: {
            'Authorization': `Token ${API_AUTH}`
        }
    })
    .catch(error => {
        console.error("Error Fetching Data:",error)
    })

    //process the data
    passage = await response.json()
    passage = passage.passages
    passage = passage.toString()
    //update read menu box
    memorize_box_read_text.innerText = passage;
    //document.getElementById("memorize_target").innerText = `${book} ${chapter}:${verseStart}-${verseEnd}`
    //passage = passage.replace(/\s\s+/g, ' ')
    //passage = passage.replace(/[\!&,;\.]/g, '')
    //passage = passage.replace(/[^\x00-\x7F]/g, '')
    //passage = passage.toLowerCase()
})



// Menu slider section start

right_arrow.addEventListener("click", function() { //mem_options_position INCREMENTS with right arrow
    
    //first ensure that we have not hit the higher end of the options list
    if(mem_options_position >= mem_options_length)
    {
        shift_mem_box("0")
        mem_options_position = 0
    }
    else
    {
        shift_mem_box("right")
        mem_options_position += 1
        console.log(mem_options_position)
    }
})

// For arrow key right
document.addEventListener("keydown", function(event) {
    //first ensure that we have not hit the higher end of the options list
    console.log("Keydown")
    if(event.key == "ArrowRight")
    {
        if(mem_options_position >= mem_options_length)
            {
                shift_mem_box("0")
                mem_options_position = 0
            }
            else
            {
                shift_mem_box("right")
                mem_options_position += 1
                console.log(mem_options_position)
            }
        }
});

left_arrow.addEventListener("click", function() { //mem_options_position DECREMENTS with left arrow
    
    //first ensure that we have not lower end of the options list
    if(mem_options_position-1 < 0)
    {
        shift_mem_box("N")
        console.log("reset to end")
        mem_options_position = mem_options_length
    }
    else
    {
        shift_mem_box("left")
        mem_options_position -= 1
        console.log(mem_options_position)
    }
})

// For arrow key left
document.addEventListener("keydown", function(event) {
    console.log("Keydown left")
    if(event.key == "ArrowLeft")
    {
        if(mem_options_position-1 < 0)
            {
                shift_mem_box("N")
                console.log("reset to end")
                mem_options_position = mem_options_length
            }
            else
            {
                shift_mem_box("left")
                mem_options_position -= 1
                console.log(mem_options_position)
            }
    }
        
});

function shift_mem_box(direction) {
    //direction = right
    //direction = left
    //direction = left until 0th element
    //direction = right until Nth element

    if(direction == "right")
    {
        console.log("right")
        mem_option_array[mem_options_position].style.left = "-150%"
        mem_option_array[mem_options_position + 1].style.left = "50%"
    }
    else if(direction == "left")
    {
        console.log("left")
        mem_option_array[mem_options_position].style.left = "150%"
        mem_option_array[mem_options_position - 1].style.left = "50%"
    }
    else if(direction == "0")
    {
        console.log("0th element")
        mem_option_array.forEach((element) => 
            element.style.left = "150%"
        )
        mem_option_array[0].style.left = "50%"
    }
    else if(direction == "N")
    {
        console.log("Nth element")
        console.log("0th element")
        mem_option_array.forEach((element) => 
            element.style.left = "-150%"
        )
        mem_option_array[mem_options_length].style.left = "50%"
    }

}

// Menu slider section end

//Menu boxes processing start

submit_blind.addEventListener("click", function() {
    var inputText = document.getElementById("verseInput").value;
    var skipped_char = false;
    var holder
    let memorize_box_blind_result = document.getElementById("memorize_box_blind_result_text")
    passage = "In the beginning, God created the heavens and the earth."
    //seperate the input and passage into arrays of words for processing.
    const regex = /[\w]+|[.,!?;:“”'()]/g;
    const input_words = inputText.match(regex);
    const verse_words = passage.match(regex)

    for(let passage_index = 0, input_index = 0; passage_index < verse_words.length; passage_index++)
    {
        let input_word = input_words[input_index]
        let verse_word = verse_words[passage_index]
        console.log(`${input_word} compared to original ${verse_word}`)

        if(typeof input_word !== 'undefined') //make sure there's actual input.
        {
            if(verse_word.toLowerCase() == input_word.toLowerCase() && !/[[.,!?;:“”'()]/.test(verse_word)) //match
            {
                memorize_box_blind_result.innerHTML += "&nbsp;"
                memorize_box_blind_result.innerHTML += verse_word
                input_index += 1
            }
            else if(verse_word.toLowerCase() == input_word.toLowerCase() && /[[.,!?;:“”'()]/.test(verse_word)) //match
            {
                memorize_box_blind_result.innerHTML += verse_word
                input_index += 1
            }
            else if(verse_word.toLowerCase() != input_word.toLowerCase()) //no match
            {
                if(!/[[.,!?;:“”'()]/.test(verse_word)) //ignore if no match caused my missing punctuation in user input
                {
                    memorize_box_blind_result.innerHTML += `&nbsp;<span id="red">${input_word}</span>`
                    input_index += 1
                }
            }
        }
        else
        {
            if(/[[.,!?;:“”'()]/.test(verse_word)) //ignore if no match caused my missing punctuation in user input
                memorize_box_blind_result.innerHTML += verse_word
            else
                memorize_box_blind_result.innerHTML += `&nbsp;<span id="red">${verse_word}</span>`
        }
    }

    document.getElementById("verseInput").style.display = "none";
    submit_blind.style.display = "none";

    document.getElementById("memorize_box_blind_result").style.display = "flex"
    document.getElementById("memorize_box_blind_result_back").style.display = "flex"

    
})

memorize_box_blind_result_back.addEventListener("click", function(){
    const memorize_box_blind_result = document.getElementById("memorize_box_blind_result")
    memorize_box_blind_result.style.display = "none"
    document.getElementById("memorize_box_blind_result_back").style.display = "none"


    document.getElementById('verseInput').value = '';
    document.getElementById("verseInput").style.display = "flex";
    submit_blind.style.display = "flex";
})