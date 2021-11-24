import React, { Component } from "react";

export default function Pill(color, title, content) {
    let colorstyles = {
    "yellow": "flex-1 bg-yellow-400 m-4 p-4 shadow-lg rounded-lg",
    "emerald": "flex-1 bg-emerald-400 m-4 p-4 shadow-lg rounded-lg",
    "blue": "flex-1 bg-blue-400 m-4 p-4 shadow-lg rounded-lg",
    "red": "flex-1 bg-red-400 m-4 p-4 shadow-lg rounded-lg"
    }
    return(
        <>
        <div class= {colorstyles[color]}>
            <h4 class="text-white text-center text-bold text-lg">{title}</h4>
            <p class="text-white text-center text-md">{content}</p>
        </div>
        </>

    );
}

