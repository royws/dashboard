$(function () {
  'use strict'

  feather.replace();
  $(document).ready(function(){
    $("#line-chart").trigger("click");
  });

  $("#line-chart").click(function(){
      $.getJSON( "src/datasets/samenleving-huwelijken.json", function( data ) {
        //console.log(data [0]["Perioden"]);
        //var dataset = JSON.parse(data);
        //console.log(dataset);
        var items = [];
        $.each( data, function( key, val ) {
            //console.log ("key"+key+" val"+val[0]);
            //items.push( "<li id='" + key + "'>" + val + "</li>" );
        })
      }).fail(function(){
        console.log("An error has occurred.");
      });
      setActive($(this));
  });
  $("#area-chart").click(function(){
      setActive($(this));
  });
  $("#bar-chart").click(function(){
      setActive($(this));
  });
  $("#pie-chart").click(function(){
      setActive($(this));
  });
  function setActive(element){
    $('.sidebar .active').removeClass('active');
    $(element).addClass('active');
  }
});
