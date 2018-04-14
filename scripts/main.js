// write your code here
$(function(){
    var orders = [];

    // get previous orders to render in the orders array 
    // get item returns a string
    // parse changes string back to js object
    var oldOrdersJSON = localStorage.getItem("coffeeOrders");
    var oldOrders = JSON.parse(oldOrdersJSON);

    // fix error: when there aren't any data in localstorage
    // the eror: orders are null - can't call forEach on null
    if (oldOrders != null) {
        orders = oldOrders
    };

    /* orders array has old orders from json object
       orders = oldOrders; moved this to line 15
       to handle edge case */

    // oldOrdersHTML is outside the scope of the loop below it
    // the order.forEach loop will add a string of html to this empty string
    var oldOrdersHTML = "";

    orders.forEach(function(currentOrder) {
        oldOrdersHTML += renderCoffeeOrder(currentOrder); 
    });

    // old orders html string will render to the orderlist div 
    $("#orderList").append(oldOrdersHTML);


	function renderCoffeeOrder(order) {
		var finalHTML = '<div class="order" data-id="'+ order.id +'">';

		finalHTML += '<span>'+ order.coffeeOrder +'</span>';
		finalHTML += '<span>'+ order.email +'</span>';
		finalHTML += '<span>'+ order.size +'</span>';
		finalHTML += '<span>'+ order.flavorShot +'</span>';
		finalHTML += '<span>'+ order.strength +'</span>';
		finalHTML += '<span class="delete">X</span>';
		finalHTML += '</div>';

		return finalHTML;
	}

	// Listen for when people submit the form
	$('form').submit(function(e){
		// code inside here will execute when the form is submitted
		e.preventDefault();
		// Maybe define some variables, set them equal to the 
		// values of the form fields
		var currentOrder = {
            id: new Date(),
			coffeeOrder: $('#coffeeOrder').val(),
			email: $('#emailInput').val(),
			size: $('input:checked').val(),
			flavorShot: $('#flavorShot').val(),
			strength:$('#strengthLevel').val()
		};

        orders.push(currentOrder);
        
		var renderedHTML = renderCoffeeOrder(currentOrder);	

		// get the renderedHTML ^^^ to show up in the DOM
		$('#orderList').append(renderedHTML);

        // Everyime a coffee order is submitted, it will be SAVED to localStorage
        var ordersJSON = JSON.stringify(orders);
        localStorage.setItem("coffeeOrders", ordersJSON);
    });
    
    /* listen for delete in this section.
       formatted to reuse this function. */
    $("#orderList").on('click', '.delete', function() {
        // remove the right order object from orders
        // can identify by using timestamps [unique id]
        var idToDelete = $(this).parent().data("id");

        /* change orders array to filter 
           filter will return true or false */
        orders = orders.filter(function(currentOrder) {
            return currentOrder.id != idToDelete;
        });

        // remove order from local storage as well 
        var ordersJSON = JSON.stringify(orders);
        localStorage.setItem("coffeeOrders", ordersJSON)

        // remove order from the screen
        $(this).parent().remove();

    });

});
