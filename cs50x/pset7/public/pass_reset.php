<?php

    // configuration
    require("../includes/config.php");
    //retrieve current password
    $rows = query("SELECT hash FROM users WHERE id = ?",$_SESSION["id"]);
    if(count($rows) != 1)
    {
        apologize("Error validating password");
    }
    $row = $rows[0];
    // if form was submitted
    if ($_SERVER["REQUEST_METHOD"] == "POST")
    {
        
        // validate submission
        if (empty($_POST["password"]))
        {
            apologize("You must enter your current password.");
        }
        if (crypt($_POST["password"], $row["hash"]) != $row["hash"])
        {
            apologize("Incorrect Password");
        }        
        else if (empty($_POST["newpassword"]))
        {
            apologize("You must enter a new password.");
        }
        else if (empty($_POST["confirmation"]))
        {
            apologize("You must re-enter your new password.");
        }
        else if($_POST["password"] === $_POST["newpassword"])
        {
            apologize("New password should be different from current one");
        }
        else if($_POST["confirmation"] != $_POST["newpassword"])
        {
            apologize("Passwords must match");
        }
        
        $result = query("UPDATE users SET hash = ? WHERE id = ?",
                        crypt($_POST["newpassword"]),$_SESSION["id"]);
                        
        if($result === false)
        {
            apologize("Error. Password Unchanged");
        
        }
        
        render("pwchanged.php", ["title" => "Confirm Password Reset"]);
        
    }
    else
    {
        // else render form
        render("pass_reset_form.php", ["title" => "Reset Password"]);
    }

?>
