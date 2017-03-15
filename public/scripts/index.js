$(document).ready(() => {

  //Click on Rec Card from homepage to create a Rec page.
  $(document).on('click', '.mainRec', function(event) {
    var id = parseInt($(this).attr('id').slice(3))
    console.log(id);
    $('.hero, .mainRec').not(this).fadeTo(500, .1 , () => {
      console.log($(this).parent().is('#cont1'));
      if ($(this).parent().is('#cont1')) {
        $(this).addClass('move')
      } else {
        $(this).addClass('move2')
      }
      $('.mainRecInfo').css('width', '40%')
    })
    $('#info'+id).append($('<div>', {class: 'recipeSteps'}))
    $(this).append($('<div>', {class: 'singleRecipe'}))
    generateRecipeSteps()
    $('.singleRecipe').append($('<div>', {class: 'showRecipe'}))
    $('.singleRecipe').append($('<button>', {class: 'singleRecBackButton'}).text('BACK'))
    $('.singleRecipe').append($('<button>', {class: 'reviewButton'}).text('Reveiws >>'))
    $('.mainRec').click(false)
  })

  //Click on 'New Recipe' to activate Create Recipe Window
  $(document).on('click', '.addRecipeButton', function() {
    $('.hero, .container').fadeTo(500, .5, () => {
    })
    $('body').append($('<div>', {class: 'addRecipeWindow'}))
    $('.addRecipeWindow').append($('<div>', {class: 'addRecImg'}))
    $('.addRecipeWindow').append($('<div>', {class: 'addRecipeWindow2'}))
    $('.addRecipeWindow2').append($('<h1>', {class: 'addRecHead'}).text('New Recipe'))
    $('.addRecipeWindow2').append($('<div>', {class: 'addStepContainerWhole'}))
    createNewAddStep(1)
    $('.addRecipeWindow2').append($('<div>', {class: 'buttonDivAdd'}))
    $('.buttonDivAdd').append($('<button>', {class: 'createNewRecipeButton', id: 'addBack'}).text('BACK'))
    $('.buttonDivAdd').append($('<button>', {class: 'createNewRecipeButton', id: 'addDone'}).text('DONE'))
  })

  $(document).on('click', '.nextStepButton', function() {
    $('.buttonDiv').remove()
    $('.addIngredient').remove()
    createNewAddStep(parseInt($('.addStepContainer').last().attr('id'))+1)
  })

  $(document).on('click', '.newIngredientButton', function() {
    generateIngredientWindow('')
  })

  $(document).on('click', '.addIngredientButton', function() {
    var ingString = $('.amountSelect').val() + ' ' + $('.measureSelect').val() + ' ' + $('.ingredientName').val()
    $('.addIngredientText').last().append(ingString)
    $('.ingredientWindow').remove()
    $('.addRecipeWindow').fadeTo(200, 1, () => {

    })
  })

  $(document).on('dblclick', '.singleIngredient', function() {
    generateIngredientWindow($(this).text())
  })


  $(document).on('click', '#addBack', function() {
    $('.addRecipeWindow').remove()
    $('.hero, .container').fadeTo(500, 1, () => {
    })
  })

  $(document).on('click', '#ingBack', function() {
    $('.ingredientWindow').remove()
    $('.addRecipeWindow').fadeTo(500, 1, () => {
    })
  })

  $(document).on('click', '.singleRecBackButton', function() {
    console.log('ping');
    location.reload()
  })

  function generateIngredientWindow(ing) {
    $('.addRecipeWindow').fadeTo(200, .5, () => {
      $('body').append($('<div>', {class: 'ingredientWindow'}))
      $('.ingredientWindow').append($('<div>', {class: 'ingredientWindow2'}))
      $('.ingredientWindow').append($('<div>', {class: 'ingredientImg'}))
      $('.ingredientWindow2').append($('<h1>', {class: 'addRecHead'}).text('New Ingredient'))
      $('.ingredientWindow2').append($('<div>', {class: 'optionsDiv'}))
      $('.ingredientWindow2').append($('<input>', {class: 'ingredientName'}).val(ing))
      $('.optionsDiv').append($('<select>', {class: 'amountSelect'}))
      $('.optionsDiv').append($('<select>', {class: 'measureSelect'}))
      $('.ingredientWindow2').append($('<div>', {class: 'buttonDiv2'}))
      $('.buttonDiv2').append($('<button>', {class: 'addIngredientButton2', id: 'ingBack'}).text('BACK'))
      $('.buttonDiv2').append($('<button>', {class: 'addIngredientButton', id: 'ingAdd'}).text('ADD'))
      populateSelects()
    })
  }

  function generateRecipeSteps() {
    for (i=0; i<10; i++) {
      $('.recipeSteps').append($('<div>', {class: 'step', id: 'step' + i}))
      $('#step' + i).append($('<h4>', {class: 'stepHead'}).text('Step ' + i))
    }
  }

  function generateReviews() {
    for (i=0; i<5; i++) {
      $('.reviewBox').append($('<div>', {class: 'review'}).text('Review'+i))
    }
    $('.container').last().append($('<button>', {class: 'addReviewButton'}).text('ADD REVIEW'))
  }

  // function createHome () {
  //   $('body').append($('<div>', {class: 'hero'}))
  //   $('.hero').append($('<div>', {class: 'label'}))
  //   $('label').append($('<button>', {class: 'addRecipeButton'}))
  //   $('body').append($('<div>', {class: 'lower'}))
  //   $('.lower').append($('<div>', {class: 'container', id: 'cont1'}))
  //   $('.lower').append($('<div>', {class: 'container', id: 'cont2'}))
  // }

  function createNewAddStep(step) {
    $('.addStepContainerWhole').append($('<div>', {class: 'addStepContainer', id: step}))
    $('.addStepContainer').last().append($('<textarea>', {class: 'addIngredientText'}).text('Step '+step+' - '))
    $('.addStepContainer').last().append($('<div>', {class: 'addIngredient'}))
    $('.addStepContainerWhole').append($('<div>', {class: 'buttonDiv'}))
    $('.buttonDiv').append($('<button>', {class: 'nextStepButton'}).text('NEXT STEP'))
    $('.buttonDiv').append($('<button>', {class: 'newIngredientButton'}).text('NEW INGREDIENT'))
    populateIngredients()
  }

  function populateIngredients() {
    for (i=1; i<40; i++) {
      $('.addIngredient').append($('<div>', {class: 'singleIngredient'}).text('Ingredient'+i))
    }
  }

  function populateSelects() {
    var measure = ['cups', 'Tbsp', 'tsp', 'oz.', 'lbs',]
    var amount = ['6','5','4','3','2','1','7/8','3/4','2/3','5/8','1/2','3/8','1/3','1/4','1/8',]
    for (i=0; i < measure.length; i++) {
      $('.measureSelect').append($('<option>').text(measure[i]))
    }
    for (i=0; i < amount.length; i++) {
      $('.amountSelect').append($('<option>').text(amount[i]))
    }
  }

  function attachRecipeToSingleWindow(element) {
    $(element).append($('<div>', {class: 'singleRecipe'}))
    $('.singleRecipe').append($('<button>', {class: 'singleRecBackButton'}))
  }

})
