<?php

    // configuration
    require("../includes/config.php");

    // if form was submitted
    if ($_SERVER["REQUEST_METHOD"] == "POST")
    {
      
        
        
        $row = query("SELECT cash FROM users WHERE id = ?",$_SESSION["id"]);
        
        $newtotal = 1000 + $row[0]["cash"];
        
        if( $newtotal > 100000)
        {
            apologize("Failed Deposit!  New balance must not exceed $100,000 ");            
        }

        
        //update cash
        query("UPDATE users SET cash= cash + 1000 WHERE id = ?",$_SESSION["id"]);

        //update history
        query("INSERT INTO History(id,transaction,price) VALUES (?,'DEP',1000)",$_SESSION["id"]);
        
        
        redirect("index.php");
      
        
    }
    else
    {
        // else render form
        render("deposit_form.php", ["title" => "Deposit"]);
    }

?>


