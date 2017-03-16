$(document).ready(() => {

  getRecipes()

  //Click on Rec Card from homepage to create a Rec page.
  $(document).on('click', '.dummy', function(event) {
    var id = parseInt($(this).attr('id').slice(3))
    $('.hero').addClass('heroShrink')
    $('.container').css('height', '600px')

    $('.hero, .mainRec').not(this).fadeTo(500, .1 , () => {

      if ($(this).parent().is('#cont1')) {
        $(this).addClass('move')
      } else {
        $(this).addClass('move2')
      }
      $(this).removeClass('dummy')
    })
    setTimeout(() => {
      $.get('https://grecipes-back-end.herokuapp.com/reviews/'+id, (data) => {
        $('.singleRecipe').append($('<button>', {class: 'reviewButton'}).text('Reveiws >> '+data.length)).hide().fadeIn(800)
        $('.reviewButton').addClass('click')
        $(document).on('click', '.reviewButton', function() {
          createReviewPage(data, id)
        })
      })
      $(this).append($('<div>', {class: 'singleRecipe'}))
      $('#info'+id).append($('<div>', {class: 'recipeSteps'}))
      generateRecipeSteps(id)
      $('.singleRecipe').append($('<div>', {class: 'showRecipe'}))
      $('#head'+id).addClass('headerMove')
      $('.showRecipe').append($('<h1>', {class: 'showRecipeHead'}).text('Ingredients')).hide().fadeIn(800)
      $('.singleRecipe').append($('<button>', {class: 'singleRecDeleteButton', id: 'recDelete'}).text('DELETE')).hide().fadeIn(800)
      $('.singleRecipe').append($('<button>', {class: 'singleRecBackButton'}).text('BACK')).hide().fadeIn(800)
      $('.mainRec').addClass('noClick')
      $('.singleRecBackButton').addClass('click')
      generateSingleRecipe(id)
    },
    1200)
  })





  //Click on 'New Recipe' to activate Create Recipe Window
  $(document).on('click', '.addRecipeButton', function() {
    $('.hero, .container').fadeTo(500, .5, () => {
    })
    $('body').append($('<div>', {class: 'addRecipeWindow'}))
    $('.addRecipeWindow').append($('<div>', {class: 'addRecImg'}))
    $('.addRecipeWindow').append($('<div>', {class: 'addRecipeWindow2'})).hide().fadeIn(500)
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
    $('.addRecipeWindow').fadeOut(500)
    $('.hero, .container').fadeTo(500, 1, () => {
    })
    setTimeout(() => {
      $('.addRecipeWindow').remove()
    },500)
  })

  $(document).on('click', '.reviewBackButton', function() {
    var id = $(this).attr('id')
    console.log(id);
    $('.reviewWindow').fadeOut()
    $('#rec'+id+' > *').fadeTo(500, 1, () => {
      console.log('yippee');
    })
    setTimeout(() => {
      $('.reviewWindow').remove()
    },500)
  })

  $(document).on('click', '#ingBack', function() {
    $('.ingredientWindow').remove()
    $('.addRecipeWindow').fadeTo(500, 1, () => {
    })
  })

  $(document).on('click', '.singleRecBackButton', function() {

    location.reload()
    // decolapseMainRec()
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

  function generateRecipeSteps(rec) {
    $.get('https://grecipes-back-end.herokuapp.com/steps/'+rec, (data) => {
      data.forEach((e) => {
        $('.recipeSteps').append($('<div>', {class: 'step', id: 'step' + e.stepOrder})).hide().fadeIn(800)
        $('#step' + e.stepOrder).append($('<h4>', {class: 'stepHead'}).text('Step ' + e.stepOrder)).hide().fadeIn(800)
        $('#step' + e.stepOrder).append($('<p>', {class: 'stepBody'}).text(e.body)).hide().fadeIn(800)
      })
    })
  }

  function generateReviews(id) {
    $.get('https://grecipes-back-end.herokuapp.com/reviews/'+id, (data) => {
      data.forEach((e) => {
        $('.reviewContainer').append($('<div>', {class: 'reviewHeader'}).text(e.name)).hide().fadeIn(300)
        $('.reviewContainer').append($('<p>', {class: 'review'}).text(e.body)).hide().fadeIn(300)
      })
      $('.newReviewForm').append($('<input>', {class: 'reviewInput click', placeholder: 'User'})).hide().fadeIn(300)
      $('.newReviewForm').append($('<textarea>', {class: 'reviewBody click', placeholder: 'Review'})).hide().fadeIn(300)
      $('.newReviewForm').append($('<div>', {class: 'buttonDiv'}))
      $('.buttonDiv').append($('<button>', {class: 'reviewBackButton click', id: id}).text('BACK')).hide().fadeIn(300)
      $('.buttonDiv').append($('<button>', {class: 'addReviewButton'}).text('ADD REVIEW')).hide().fadeIn(300)
    })
  }

  function createHome (data) {
    var counter = 1
    $('body').append($('<div>', {class: 'hero'}))
    $('.hero').append($('<div>', {class: 'label'}))
    $('.hero').append($('<button>', {class: 'addRecipeButton'}).text('NEW RECIPE'))
    $('body').append($('<div>', {class: 'lower'}))
    $('.lower').append($('<div>', {class: 'container', id: 'cont1'}))
    $('.lower').append($('<div>', {class: 'container', id: 'cont2'}))
    data.forEach((e) => {
      if ($('.mainRec').length < 3) {
        $('#cont1').append($('<div>', {class: 'mainRec', id: 'rec'+counter}))
      } else {
        $('#cont2').append($('<div>', {class: 'mainRec', id: 'rec'+counter}))
      }
      $('.mainRec').addClass('dummy')
      $('.mainRec').last().append($('<div>', {class: 'mainImg'}))
      $('.mainImg').last().append($('<img>', {src: e.imgURL, alt: 'img'}))
      $('.mainRec').last().append($('<div>', {class: 'mainRecInfo', id: 'info'+counter}))
      $('.mainRecInfo').last().append($('<h2>', {class: 'mainRecHead', id: 'head'+ counter}).text(e.title))
      $('.mainRecInfo').last().append($('<h3>', {class: 'mainRecRating'}).text('User Rating: '+e.rating))
      $('.mainRecInfo').last().append($('<h4>', {class: 'mainRecDesc'}).text(e.description))
      counter++
    })
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

  function createRecipe(data) {
    data.forEach((e) => {
      $('.showRecipe').append($('<p>', {class: 'ingredient'}).hide().fadeIn(800).text(e.quantity+' '+e.units+' '+e.name))
    })
  }

  function attachRecipeToSingleWindow(element) {
    $(element).append($('<div>', {class: 'singleRecipe'}))
    $('.singleRecipe').append($('<button>', {class: 'singleRecBackButton'}))
  }

  function getRecipes() {
    $.get('https://grecipes-back-end.herokuapp.com/recipes', (data) => {
      createHome(data)
    })
  }

  function generateSingleRecipe(id) {
    $.get('https://grecipes-back-end.herokuapp.com/ingredients/'+id, (data) => {
      createRecipe(data)
    })
  }

  function decolapseMainRec() {
    var $this = $(event.target).parents('.mainRec');
    var id = parseInt($this.attr('id').slice(3))
    var $head = $('#head'+id)
    $('.singleRecipe').slideLeft(1000, function() {
      $('.singleRecipe').remove();
      $this.addClass('collapse', ()=> {
        $this.removeClass('collapse')
      })
      $head.addClass('headershrink')
    });
  }

  function createReviewPage(data, id) {
    $('#rec'+id+' > *').fadeTo(500, .1 , () => {

    })
    $('#rec'+id).append($('<div>', {class: 'reviewWindow'})).hide().fadeIn(300)
    $('.reviewWindow').append($('<div>', {class: 'reviewContainerPre'})).hide().fadeIn(300)
    $('.reviewWindow').append($('<div>', {class: 'reviewContainerPost'})).hide().fadeIn(300)
    $('.reviewContainerPost').append($('<div>', {class: 'reviewImg'})).hide().fadeIn(300)
    $('.reviewContainerPost').append($('<div>', {class: 'reviewContainer'})).hide().fadeIn(300)
    $('.reviewContainerPost').append($('<div>', {class: 'newReviewForm'})).hide().fadeIn(300)
    $('.reviewContainerPre').append($('<div>', {class: 'reviewWindowHead'}).text('Reviews')).hide().fadeIn(300)
    generateReviews(id)
  }
})
