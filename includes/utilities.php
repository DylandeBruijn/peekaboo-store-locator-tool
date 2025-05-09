<?php

/* 
    Debug
    @param mixed $value
    @return void
*/
function d($value)
{
    echo "<pre>";
    var_dump($value);
    echo "</pre>";
}

/* 
    Debug and die
    @param mixed $value
    @return void
*/
function dd($value)
{
    echo "<pre>";
    var_dump($value);
    echo "</pre>";

    die();
}
