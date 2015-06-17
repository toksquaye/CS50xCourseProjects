<?php

    // configuration
    require("../includes/config.php");
        
        
        //get the history or current user
        $rows = query("SELECT * FROM History WHERE id = ?",$_SESSION["id"]);
        if($rows === false)
        {
            apologize("You have no transaction history");
        }
        
        // else render form
        render("trans_history.php", ["title" => "History", "rows" => $rows]);

?>


