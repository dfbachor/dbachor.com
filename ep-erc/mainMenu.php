    
	        
	  	<ul class="nav nav-tabs">
		    <li class="active"><a class="menu" id="tabHome" data-toggle="tab" href="#mainMenu">Home</a></li>
		    <li class="loggedOn" id='contractsTab'><a class="menu" data-toggle="tab" href="#contractsMenu">Contracts</a></li>
		    <li class="loggedOn" id='tasksTab'><a class="menu" data-toggle="tab" href="#tasksMenu">Tasks</a></li>
		    <li class="loggedOn" id='usersTab'><a class="menu" data-toggle="tab" href="#usersMenu">Users</a></li>
		    <li class="loggedOn admin" id='settingsTab'><a class="menu" data-toggle="tab" href="#settingsMenu">Settings</a></li>
		</ul>
  
	    <div class="tab-content">
		    
<!--
		    <div id="mainMenu" class="tab-pane fade in">
				<h3>Home Menu </h3>
	    	</div>
-->


			<?php //include($_SERVER['DOCUMENT_ROOT'] . "/dbachor.com/ep-erc/mainHomeMenu.html"); ?>	  	    
			<?php //include($_SERVER['DOCUMENT_ROOT'] . "/dbachor.com/ep-erc/mainContractsMenu.html"); ?>	  	    
			<?php //include($_SERVER['DOCUMENT_ROOT'] . "/dbachor.com/ep-erc/mainTasksMenu.html"); ?>	  	    
			<?php //include($_SERVER['DOCUMENT_ROOT'] . "/dbachor.com/ep-erc/mainUserMenu.html"); ?>	  	    
			<?php //include($_SERVER['DOCUMENT_ROOT'] . "/dbachor.com/ep-erc/mainSettingsMenu.html"); ?>	
			  

			<?php include("mainHomeMenu.html"); ?>	  	    
			<?php include("mainContractsMenu.html"); ?>	  	    
			<?php include("mainTasksMenu.html"); ?>	  	    
			<?php include("mainUserMenu.html"); ?>	  	    
			<?php include("mainSettingsMenu.html"); ?>	
			  

	
	 	</div> <!-- tab-content -->
