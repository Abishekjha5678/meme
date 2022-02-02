import React, { Fragment, useEffect, useState } from "react";
import { Meme } from "./component/Meme";

const objectToQueryParam= (obj) =>{
  const params=Object.entries(obj).map(([key,value]) => '${key}=${value}')
  return "?" + params.join('&');
}

const App=()=>{
  const [templates,setTemplates]=useState([])
  const [template,setTemplate]=useState(null);
  const [topText,setTopText]=useState("");
  const [bottomText,setBottomText]=useState("");
  const [meme,setMeme]=useState(null);
  

    useEffect(() => {
    fetch('https://api.imgflip.com/get_memes').then(x=>x.json().
    then(response=>setTemplates(response.data.memes)));
  },[]);

    if (meme){
      return(
        <div style={{textAlign:"center"}}>
      <img
      style={{size:200}}
      src={meme} alt="custom meme"/>
      </div>
      );}
  return(
     <div style={{textAlign:"center"}}>
     { template && (
      <form onSubmit={async e=>{
        e.preventDefault()
        //add logic to creae MEME from Api
        const params={
          template_id:template.id,
          text0:topText,
          text1:bottomText,
          username:"abhi9709",
          password: "abhi@1998jha"

        };
        const response = await fetch(
          'https://api.imgflip.com/caption_image${objectToQueryParam(params)}'
          );
        
        const json= await response.json();
          setMeme(json.data.url);
       }}
      >
        <Meme template={template}/>
          <input placeholder="Top Text" value={topText}
          onChange={e=>setTopText(e.target.value)}
          style={{backgroundColor:"cyan",borderRadius:"25px" ,fontWeight:"bold"}}
          />
        <input placeholder="Bottom Text" 
          value={bottomText}
          onChange={e=>setBottomText(e.target.value)}
          style={{backgroundColor:"cyan",borderRadius:"25px", fontWeight:"bold"}}
        />
        <button type="submit" style={{backgroundColor:"cyan",borderRadius:"25px"}}> Create Meme</button>
      </form>
     )}
     
     {!template &&(
       <Fragment>
         <h1>Pick a Meme</h1>
          {templates.map(template=>{
          return(
          <Meme  
            template={template}
            topText={topText}
            bottomText={bottomText}
            onClick={()=>{
             setTemplate(template)
             }}
          />
          );
          })}
        </Fragment>
      )}
    </div>
  );
}
export default App;