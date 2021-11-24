import React, { Component } from "react";

export default function TitlePill(a, b) {

    return(
        <>
        <div class="container mx-auto">
            <div class="flex flex-row mx-auto mb-6">
               <div class="flex w-1/2 mx-auto border-2 border-white-400 shadow-lg rounded-xl h-16">
                   {a}
                   {b}
               </div>
            </div>
        </div>
        </>

    );
}

