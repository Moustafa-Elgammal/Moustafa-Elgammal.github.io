<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <meta charset="utf-8">
    <title>Places Searchbox</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">

   <script type="text/javascript" src="../web-start/scripts/imp.js" ></script>
       <link rel="stylesheet" type="text/css" href ="../web-start/styles/col.css">
</head>
<body>

<div id="map" style="height:400px; width:100%;"></div>

 <script src="https://maps.googleapis.com/maps/api/js?key=AIz
aSyCBHw3oI9eSnSOW1bb84a7ouDOYBFvBLjc&libraries=places&callback=initAutocomplet
e"  async defer></script>


    <input id="pac-input" class="controls" type="text" placeholder="Search Box">

    <div>
        
        <?php include('form.php'); ?> 
    </div>





</body>



 </html>
