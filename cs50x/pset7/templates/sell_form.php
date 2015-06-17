<b>Please select the stock you wish to sell : </b>
<form action="sell.php" method="post">

    <select name="symbol">
    <option value=" "> </option>
<?php
    // gets all the stocks owned by the current user
    $rows = query("SELECT symbol FROM portfolio WHERE id = ?",$_SESSION["id"]);
    foreach($rows as $row):     
       $symbol = $row["symbol"]; 
?>    
       <option value="<?= $symbol ?> "> <?= $symbol ?> </option>
    <?php endforeach ?>
    </select>
    <br/>
    <br/>
    
    <input type="submit" value="Sell" />     

 
</form>


