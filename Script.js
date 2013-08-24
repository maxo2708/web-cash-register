var Total = 0

$(document).ready(function () {
    //Hides main application
    $('#Overlay2').hide();
    
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

    $('#Submit').click(function () {

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
    ) 


})
