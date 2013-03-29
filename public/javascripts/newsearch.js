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
        var Title = $(".Title")[0].value
        var Field = $(".Field")[0].value
        
        var KW1 = $(".Keyword")[0].value 
        var KW1imp = $(".kw1importance")[0].value
        var KW2 = $(".Keyword")[1].value 
        var KW2imp = $(".kw2importance")[0].value
        var KW3 = $(".Keyword")[2].value 
        var KW3imp = $(".kw3importance")[0].value
        var KW4 = $(".Keyword")[3].value 
        var KW4imp = $(".kw4importance")[0].value

        var Age = $(".Age")[0].value 
        var Ageimp = $(".ageimportance")[0].value
        var Loc = $(".Location")[0].value 
        var Locimp = $(".locimportance")[0].value 
        var Gen = $(".Gender")[0].value 
        var Genimp = $(".genimportance")[0].value
        var For = $(".Formality")[0].value 
        var Forimp = $(".forimportance")[0].value 
        $.post("/createsearch", {title: Title, field: Field, 
            kw1: KW1, kw1imp: KW1imp, kw2: KW2, kw2imp: KW2imp, kw3: KW3, kw3imp: KW3imp, kw4: KW4, kw4imp: KW4imp,
            age: Age, ageimp: Ageimp, loc: Loc, locimp: Locimp, gen: Gen, genimp: Genimp, form: For, forimp: Forimp 
        }, function(data){
            console.log(data)
             window.location="/searches";
        });
    })
    $("#toggler").click(function(){
        $("#people").toggle();
    })
})
