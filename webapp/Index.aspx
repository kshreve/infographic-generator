﻿<%@ Page Language="C#" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<script runat="server">

</script>

<html xmlns="http://www.w3.org/1999/xhtml">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="viewport" content="width=device-width/" >
<meta name="viewport" content="width=device-width, maximum-scale=1.0" />

<head runat="server">
    <title>Infographics Generator Home Page</title>
        <link rel="stylesheet" media="all and (orientation:portrait)" href="Styles/portrait.css">
		<link rel="stylesheet" media="all and (orientation:landscape)" href="Styles/landscape.css">
        <link href="Styles/style.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="Scripts/jquery-1.7.1.min.js"></script>
		<script type="text/javascript" src="Scripts/jquery.roundabout.js"></script>
		<script type="text/javascript" src="Scripts/jquery.event.drag-2.0.js"></script>
		<script type="text/javascript" src="Scripts/jquery.event.drop-2.0.js"></script>
		<script type="text/javascript">
		    var updateLayout = function () {
		        if (window.innerWidth != currentWidth) {
		            currentWidth = window.innerWidth;
		            var orient = (currentWidth == 320) ? "profile" : "landscape";
		            document.body.setAttribute("orient", orient);
		            window.scrollTo(0, 1);
		        }
		    };
		    iPhone.DomLoad(updateLayout);
		    setInterval(updateLayout, 400);
		</script>
		<script type="text/javascript">
		    $(document).ready(function () {
		        $('ul').roundabout({
		            minScale: 0.6,
		            reflect: true,
		            enableDrag: true,
		            tilt: -3
		        });
		    });
		</script>
		<style type="text/css">
			ul {    
				list-style: none;
				padding: 0;
				margin: 0 auto;
				width: 36em;
				height: 24em;
			}
			li {
				//height: 12em;
				//width: 12em;
				//background-color: #ffffff;
				opacity: 0.1;
				text-align: center;
				cursor: pointer;
				border: 0px solid #bbb;
				-webkit-border-radius: 7em;
				-moz-border-radius: 7em;
				-ms-border-radius: 7em;
				-o-border-radius: 7em;
				border-radius: 7em;
			}
				li.roundabout-in-focus {
					cursor: default;
				}
			span {
				display: block;
				padding-top: 3.5em;
			}
		</style>
	</head>
<body>
    <div id="mpage">		
		<div id="main">
			<ul>
				<li><span><a href="Sales.aspx"><img src="images/icon_sale.png" alt="Sale"></a>Sale</span></li>
				<li><span><a href="http://yahoo.com"><img src="images/icon_service.png" alt="Service"></a>Service</span></li>
				<li><span><a href="http://bing.com"><img src="images/icon_lead.png" alt="Lead"></a>Lead</span></li>
			</ul>
            <address></address>
		</div>
	</div>

</body>
</html>
