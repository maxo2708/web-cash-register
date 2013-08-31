//Declaring functions and variables until $(document).ready();
var Total = 0

//Code for item submission
var Submit = function () {
    //Declare Variables
    var ItemName = $('input[name=ItemName]').val();
    var PriceVal = $('input[name=PriceVal]').val();
    //Verifies that the value in the 'Price Box' is valid
    if (PriceVal == "" || PriceVal == null) {
        alert("Please Enter in a Price");
    }
    else if (isNaN(PriceVal)) {
        alert("The value in the Price Box is Not a Number");
    }
    else {
        $('#Price').append('<p class="item">' + PriceVal + '</p>');
        //Calculates current total
        Total += Number(PriceVal);
        $('#LogTotal').html('Total: ' + Total);
        //Checks items name then appends it
        if (ItemName == "" || ItemName == null) {
            $('#Item').append('<p class="item"> Unidentified Item </p>');
        }
        else {
            $('#Item').append('<p class="item">' + ItemName + '</p>');
        }
    }
}

//Code for Checkout
var Checkout = function () {
    //Hide and Show some GUI for Checkout
    $('#Submit').off();
    $('#UsrItem').hide();
    $('#UsrPrice').hide();
    $('#Checkout').hide();
    $('#UsrOwe').show();
    $('#UsrPaid').show();
    $('#Reset').show();
    //Checks the Amount paid and shows AmtLeft or Change
    $('#Submit').on("click", function () {
        var AmtPaid = $('input[name=UsrPaid]').val();
        var Change = AmtPaid - Total;
        if (AmtPaid == null || AmtPaid == "") {
            alert("Please insert the amount paid.");
        }
        else if (isNaN(AmtPaid)) {
            alert("Please insert the amount paid in a numerical form.");
        }
        else if (Change < 0) {
            $('#Change').html('Amount Left: ' + Math.abs(Change));
        }
        else {
            $('#Change').html('Change: ' + Change);
        }

    })
}

//Code for reset
var Reset = function () {
    //Configure Event Handlers
    $('#Submit').off();
    $('#Submit').on("click", Submit);
    //Configure GUI for application reset
    $('#UsrOwe').hide();
    $('#UsrPaid').hide();
    $('#Reset').hide();
    $('#UsrItem').show();
    $('#UsrPrice').show();
    $('#Checkout').show();
    //Reset previous entries and changes
    $('.item').remove();
    Total = 0;
    $('#LogTotal').html("Total: ");
}

//Starting Code
$(document).ready(function () {
    //Hides main application and other overlays
    $('#Overlay2').hide();
    $('#UsrOwe').hide();
    $('#UsrPaid').hide();
    $('#Reset').hide();

    //Hides Start Screen and Shows Application
    $('#OverlayButton').click(function () {
        $('#Overlay1').fadeOut('slow');
        $('#Overlay2').fadeIn('slow');
    })

    //Prevents the use of the 'Enter' key
    $('input').keypress(function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
        }
    })

    //Call Submit and Checkout function when event occurs
    $('#Submit').on("click", Submit);
    $('#Checkout').on("click", Checkout);
    $('#Reset').on("click", Reset)

}) 

//For debug purposes
/*$(document).ready(function () {
    $('#Overlay1').hide();
    $('#Overlay2').hide();
})*/
