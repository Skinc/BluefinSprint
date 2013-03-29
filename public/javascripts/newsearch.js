$(function() {
    $(document).on('click','.submit',function(){
        console.log(this)
        console.log("Title:" + $(".Title")[0].value )
        console.log("Field:" + $(".Field")[0].value)
        console.log("KW1:" + $(".Keyword")[0].value + " with importance: " + $(".kw1importance")[0].value )
        console.log("KW2:" + $(".Keyword")[1].value + " with importance: " + $(".kw2importance")[0].value )
        console.log("KW3:" + $(".Keyword")[2].value + " with importance: " + $(".kw3importance")[0].value )
        console.log("KW4:" + $(".Keyword")[3].value + " with importance: " + $(".kw4importance")[0].value )
        console.log("Age:" + $(".Age")[0].value + " with importance: " + $(".ageimportance")[0].value )
        console.log("Location:" + $(".Location")[0].value + " with importance: " + $(".locimportance")[0].value )
        console.log("Gender:" + $(".Gender")[0].value + " with importance: " + $(".genimportance")[0].value )
        console.log("Formality:" + $(".Formality")[0].value + " with importance: " + $(".forimportance")[0].value )
        
        console.log()
        console.log()
    })
})
