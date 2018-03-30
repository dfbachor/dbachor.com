<?php
	//echo " config ";
    // These variables define the connection information for your MySQL database 
    
    class Database extends PDO {
	    
	    //mac
	    //public $username = "dbachor"; 
	    //public $password = "detorres1";
	    //public $host = "localhost" ; 
	    //public $dbname = "petersonSkiAndCycle"; 
	    
	    
	    //godaddy
	    public $username = "petersonAdmin"; 
	    public $password = "petersonAdmin";
	    public $host = "localhost" ; 
	    public $dbname = "petersonSkiAndCycle"; 
	    
	    	    	    
	    public $opts = array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'); 

	    public function __construct($dsn = null, $user = null, $pass = null, $opts = null) 
	    { 
	        parent::__construct("mysql:host={$this->host};dbname={$this->dbname}", 
	            $this->username, 
	            $this->password, 
	            $this->opts 
	        ); 
	        $this->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 
	    } 

	
	    public function getDBConnection() {
		    return $this->$conn;
	    }
	    
    } 
?>