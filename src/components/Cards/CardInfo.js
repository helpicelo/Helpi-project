import React, { Component } from "react";

// components

export default function CardInfo(info) {

  return (
    <>
      <div class="container mx-auto">
            <div class="flex m-4 bg-emerald-200 border-2 shadow-lg border-green-500 p-4 rounded-lg opacity-50 text-black text-semibold text-justified text-md">
                {info}
            </div>
        </div>
    </>
  );
}
