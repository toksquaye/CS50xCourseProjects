<?php

    // configuration
    require("../includes/config.php");

    // if form was submitted
    if ($_SERVER["REQUEST_METHOD"] == "POST")
    {
        // TODO
        // validate submission
        if (empty($_POST["username"]))
        {
            apologize("You must provide your username.");
        }
        else if (empty($_POST["password"]))
        {
            apologize("You must provide your password.");
        }
        else if (empty($_POST["confirmation"]))
        {
            apologize("You must re-enter your password.");
        }
        else if($_POST["confirmation"] != $_POST["password"])
        {
            apologize("Passwords must match");
        }
        else if(empty($_POST["email"]))
        {
            apologize("Please enter email address");
        }
        else if (!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)) 
        {
            apologize("Enter valid email address");
        }
        
        $result = query("INSERT INTO users(username,hash,cash,email) VALUES (?,?,10000.00,?)",
                        $_POST["username"],crypt($_POST["password"]),$_POST["email"]);
                        
        if($result === false)
        {
            apologize("Error with registration. Username already exists.");
        
        }
        //if the insert was successful, log in the user
        $rows = query("SELECT LAST_INSERT_ID() AS id");
        $id = $rows[0]["id"];
        
        $_SESSION["id"] = $id;
        
        redirect("index.php");
    }
    else
    {
        // else render form
        render("register_form.php", ["title" => "Register"]);
    }

?>
