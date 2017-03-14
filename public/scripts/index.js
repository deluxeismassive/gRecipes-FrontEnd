$(document).ready(() => {

  //Click on Rec from homepage to create a Rec page.
  $(document).on('click', '.mainRec', function(event) {
    $('body').css("visibility", "hidden");
    $(this).addClass('recPageHero')
    $(this).removeClass('mainRec')
    $(this).removeClass('mainRecHead')
    $(this).removeClass('mainRecDesc')
    $(this).removeClass('mainRecRating')
    $('h2').addClass('recPageHead')
    $('h3').addClass('recPageRating')
    $('h4').addClass('recPageDesc')
    generateSingleRecipe(this)
  })

  $(document).on('click', '.addRecipeButton', function() {
    $('.hero, .container').fadeTo(200, .5, () => {
    })
    $('body').append($('<div>', {class: 'addRecipeWindow test'}))
    $('.addRecipeWindow').append($('<h1>', {class: 'addRecHead'}).text('New Recipe'))
    $('.addRecipeWindow').append($('<div>', {class: 'addStepContainerWhole'}))
    createNewAddStep(1)
    $('.addRecipeWindow').append($('<button>', {class: 'createNewRecipeButton'}).text('DONE'))
  })

  $(document).on('click', '.nextStepButton', function() {
    $('.buttonDiv').remove()
    $('.addIngredient').remove()
    createNewAddStep(parseInt($('.addStepContainer').last().attr('id'))+1)
  })

  $(document).on('click', '.newIngredientButton', function() {
    $('.addRecipeWindow').fadeTo(200, .5, () => {
      $('body').append($('<div>', {class: 'ingredientWindow'}))
      $('.ingredientWindow').append($('<h1>', {class: 'addRecHead'}).text('New Ingredient'))
      $('.ingredientWindow').append($('<div>', {class: 'optionsDiv'}))
      $('.ingredientWindow').append($('<input>', {class: 'ingredientName'}))
      $('.optionsDiv').append($('<select>', {class: 'amountSelect'}))
      $('.optionsDiv').append($('<select>', {class: 'measureSelect'}))
      $('.ingredientWindow').append($('<button>', {class: 'addIngredientButton'}).text('ADD'))
      populateSelects()
    })
  })

  $(document).on('click', '.addIngredientButton', function() {
    var ingString = $('.amountSelect').val() + ' ' + $('.measureSelect').val() + ' ' + $('.ingredientName').val()
    $('.addIngredientText').append(ingString)
    $('.ingredientWindow').remove()
    $('.addRecipeWindow').fadeTo(200, 1, () => {
      console.log('bonk');
    })
  })







  function generateSingleRecipe(element) {
    $('body').empty()
    $('body').append(element)
    $('body').css("visibility", "visible");
    $('body').append($('<div>', {class: 'test lower'}))
    $('.lower').append($('<div>', {class: 'test container centerItems'}))
    $('.lower').append($('<div>', {class: 'test container centerTop'}))
    $('.container').first().append($('<div>', {class: 'test recipeSteps'}))
    $('.container').last().append($('<div>', {class: 'test reviewBox'}))
    generateRecipeSteps()
    generateReviews()
  }

  function generateRecipeSteps() {
    for (i=0; i<10; i++) {
      $('.recipeSteps').append($('<div>', {class: 'step test'}).text(i+':'))
    }
  }

  function generateReviews() {
    for (i=0; i<5; i++) {
      $('.reviewBox').append($('<div>', {class: 'test review'}).text('bonk'))
    }
    $('.container').last().append($('<button>', {class: 'addReviewButton'}).text('ADD REVIEW'))
  }

  function createHome () {
    $('body').append($('<div>', {class: 'hero'}))
    $('.hero').append($('<div>', {class: 'label'}))
    $('label').append($('<button>', {class: 'addRecipeButton'}))
  }

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
})
