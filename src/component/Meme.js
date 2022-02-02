import React from "react";

export const Meme=({template,onClick,topText,bottomText})=>{
    return(
        <div>
        <h1>{topText}</h1>
             <img  style={{width:200}}
        name={template.name}
        key={template.id} 
        src={template.url}
        alt={template.name}
        onClick={onClick}
        />
        <h1>{bottomText}</h1>
        </div>
      );

};