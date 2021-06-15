import React from "react"
import styled from "styled-components"



const Title = styled.div`
  font-size: 2em;
  margin: auto;
  font-color:black;
  `;

  const Image = styled.img`
  max-width:100%
  `
function VideoCard({thumbnail,title,url,description}){
    return(
        <div>
            <Title>
                {title}
            </Title>
            <Title>
            <a href= {url?`https://www.youtube.com/watch?v=${url}`:null} >
            <Image src={thumbnail} alt={description}></Image></a>
            </Title>
        </div>
    )
}

export default VideoCard;