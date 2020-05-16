
$(document).ready(function () {
  $("#mycarousel").carousel({ interval: 2000 });
  $("#carousel-pause").click(function () {
    $("#mycarsousel").carousel("pause");
  });
  $("#carousel-play").click(function () {
    $("#mycarousel").carousel("cycle");
  });
});

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});
$(document).ready(function(){
  $("#loginbutton").click(function () {  
    $(this).attr("data-toggle","modal");
    $(this).attr("data-target","#loginmodal");        
  });


  $('#bookingbuton').click(function () {
      $(this).attr("data-toggle","modal");
      $(this).attr("data-target","#bookingmodal");
    });

  $("#navtogglebutton").click(function(){
    $(this).attr('data-toggle','collapse')
    $(this).attr('data-target','#Navbar')
  });

  $('.loginmodalclose').click(function() {
    $(this).attr('data-dismiss','modal');
  });

  $('.bookingmodalclose').click(function() {
    $(this).attr('data-dismiss','modal');
  });
  });


/*
$(document).ready( function(){
$('#mycarousel').carousel({interval:1000});
$('carouselbutton').click(function(){
  if($('carouselbutton').children('span').hasClass('fa-pause')){
    $("#mycarousel").carousel('pause');
    $('#carouselbutton').children('span').removeClass('fa-pause');
    $('#carouselbutton').children('span').addClass('fa-play');
  }
  else{
    $("#mycarousel").carousel('cycle');
    $('#carouselbutton').children('span').removeClass('fa-play');
    $('#carouselbutton').children('span').addClass('fa-pause');
  }
});
});
*/